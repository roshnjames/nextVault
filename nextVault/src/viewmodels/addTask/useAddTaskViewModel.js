import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { TaskContext } from '../../context/taskDetails';
import { insertNewTask } from '../../database/database';
import { addTaskScreenTexts, commonTexts, ON_OFF } from '../../strings/textLoader';
import addTaskScreenStyles from '../../styles/screens/addTask/addTaskScreen.styles';
import { addTaskPriorityVals } from '../../utils/dropDownValues';

const useAddTaskViewModel = ({ route }) => {
    const navigation = useNavigation();
    const date = route?.params.date;
    const { setHeader, setLoading, setPopupVisible, setPopupText, popupVisible, popupText } = useContext(TaskContext);
    const styles = addTaskScreenStyles();

    const [addTaskNewTask, setAddTaskNewTask] = useState('');
    const [addTaskNewTaskDetails, setAddTaskNewTaskDetails] = useState('');
    const [addTaskPriority, setAddTaskPriority] = useState(addTaskPriorityVals[1].label);
    const [addTaskAlertEnabled, setAddTaskAlertEnabled] = useState(true);
    const [addTaskImageCaptured, setAddTaskImageCaptured] = useState(null);
    const folderPath = `${RNFS.DocumentDirectoryPath}/TaskImages`;
    const folderExists = useRef(false);
    const addTaskImageDestination = useRef('');
    const [addTaskTag, setAddTaskTag] = useState('Low');
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

    const addTaskImageSaver = async () => {
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
                async (response) => {
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

                        if (await RNFS.exists(addTaskImageDestination.current)) {
                            setAddTaskImageCaptured(addTaskImageDestination.current);
                        } else {
                            throw new Error(commonTexts.IMAGE_FAILED);
                        }
                    }
                }

            );
        } catch (error) {
            console.error('error occurred in image Capture and saving...');
        }

    };

    const validateNewTask = () => {
        return addTaskNewTask === '' || addTaskNewTaskDetails === '' ? false : true;
    }
    const resetTaskData = () => {
        setAddTaskNewTask('');
        setAddTaskNewTaskDetails('');
        setAddTaskPriority(1);
        setAddTaskAlertEnabled(true);
        setAddTaskImageCaptured(null);
        setAddTaskTag(1);
    }

    const handleTaskSubmit = async () => {
        try {
            setLoading(true);
            const isValid = validateNewTask();
            if (isValid) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                newTaskCreated.current.task_name = addTaskNewTask;
                newTaskCreated.current.task_priority = addTaskPriority;
                newTaskCreated.current.task_details = addTaskNewTaskDetails;
                newTaskCreated.current.task_alert = addTaskAlertEnabled ? 1 : 0;
                newTaskCreated.current.task_image = addTaskImageCaptured;
                newTaskCreated.current.task_date = date;
                newTaskCreated.current.task_tag = addTaskTag;

                console.log('new Task :\n', JSON.stringify(newTaskCreated.current));

                const res = await insertNewTask(newTaskCreated.current);
                if (Object.keys(res).length > 0) {
                    resetTaskData();

                    Toast.show({
                        type:'success',
                        position:'bottom',
                        text1:'Task Saved!',
                        visibilityTime:3000,
                        avoidKeyboard:true,
                        bottomOffset:250
                        
                    });

                    navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes:[{
                                name:'home'
                            }]
                        })
                    );
                } else {
                    setPopupText('Failed to save task!');
                    throw new Error('Failed');             }
            } else {
                setPopupText('Please enter the required fields!');
                throw new Error('fields');
            }
        } catch (error) {
            setPopupVisible(true);
        } finally {
            setLoading(false);
        }
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
        setAddTaskNewTask,
        addTaskNewTaskDetails,
        setAddTaskNewTaskDetails,
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
        setAddTaskTag,
        setPopupVisible,
        popupVisible,
        popupText
    }

}
export default useAddTaskViewModel;