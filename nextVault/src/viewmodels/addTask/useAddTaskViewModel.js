import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import { TaskContext } from '../../context/taskDetails';
import { addTaskScreenTexts, commonTexts, ON_OFF } from '../../strings/textLoader';
import addTaskScreenStyles from '../../styles/addTask/addTaskScreen.styles';
import { addTaskPriorityVals } from '../../utils/dropDownValues';

const useAddTaskViewModel = ({ route }) => {
    const navigation = useNavigation();
    const date = route?.params.date;
    const { setHeader, setLoading } = useContext(TaskContext);
    const styles = addTaskScreenStyles();

    const addTaskNewTask = useRef('');
    const addTaskNewTaskDetails = useRef('');
    const [addTaskPriority, setAddTaskPriority] = useState(addTaskPriorityVals[1].label);
    const [addTaskAlertEnabled, setAddTaskAlertEnabled] = useState(true);
    const [addTaskImageCaptured, setAddTaskImageCaptured] = useState(null);
    const folderPath = `${RNFS.DocumentDirectoryPath}/TaskImages`;
    const folderExists = useRef(false);
    const addTaskImageDestination = useRef('');
    const [addTaskTag,setAddTaskTag] = useState('Low');
    const newTaskCreated = useRef({});

    useFocusEffect(
        useCallback(() => {
            setHeader(addTaskScreenTexts.HEADING);
        }, [])
    );

    useEffect(() => {
        const checkFolderExists = async () => {
            folderExists.current = await RNFS.exists(folderPath);
        }
        checkFolderExists();
    }, [])

    const addTaskImageSaver = async() => {
        try {
            if (!folderExists.current) {
                await RNFS.mkdir(folderPath);
            }

            launchCamera(
                {
                    cameraType: 'back',
                    mediaType: 'photo',
                    saveToPhotos: false
                },
                async(response) => {
                    if (response.didCancel) {
                        throw new Error(commonTexts.CANCELLED);
                    } else if (response.errorCode) {
                        throw new Error(commonTexts.ERROR_SOMETHING);
                    } else {
                        const capturedImage = response.assets[0].uri;
                        addTaskImageDestination.current = `${folderPath}/${`task_${Date.now()}.jpg`}`;
                     await RNFS.moveFile(
                            capturedImage.replace('file://', ''),
                            addTaskImageDestination.current
                        )

                        if(await RNFS.exists(addTaskImageDestination.current)){
                            setAddTaskImageCaptured(addTaskImageDestination.current);
                        }else{
                            throw new Error(commonTexts.IMAGE_FAILED);
                        }
                    }
                }

            );
        } catch (error) {
            console.error('error occurred in image Capture and saving...');
        }

    };

    const handleTaskSubmit = async() => {
        try{
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            newTaskCreated.current.task_name = addTaskNewTask.current;
            newTaskCreated.current.task_priority = addTaskPriority;
            newTaskCreated.current.task_details = addTaskNewTaskDetails.current;
            newTaskCreated.current.task_alert = addTaskAlertEnabled;
            newTaskCreated.current.task_image = addTaskImageCaptured;
            newTaskCreated.current.task_tag = addTaskTag;

            console.log('new Task :\n',JSON.stringify(newTaskCreated.current));


        }catch(error){
            console.error('error occurred in submitting',error);
        }finally{
            setLoading(false);
        }
        console.log('data ready to submit',addTaskNewTask,addTaskNewTaskDetails,addTaskPriority,addTaskAlertEnabled,addTaskImageCaptured,addTaskTag);
    }

    return {
        styles,
        date,
        navigation,
        ON_OFF,
        addTaskImageDestination,
        addTaskScreenTexts,
        addTaskPriorityVals,
        addTaskNewTask,
        addTaskNewTaskDetails,
        addTaskPriority,
        setAddTaskPriority,
        addTaskAlertEnabled,
        setAddTaskAlertEnabled,
        addTaskImageSaver,
        addTaskImageCaptured,
        setAddTaskImageCaptured,
        commonTexts,
        handleTaskSubmit,
        addTaskTag,
        setAddTaskTag
    }

}
export default useAddTaskViewModel;