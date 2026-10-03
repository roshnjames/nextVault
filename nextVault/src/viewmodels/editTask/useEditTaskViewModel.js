import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useRef, useState } from "react";
import RNFS from 'react-native-fs';
import { launchCamera } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { TaskContext } from "../../context/taskDetails";
import { fetchTaskById, updateTaskById } from "../../database/database";
import { commonTexts, editTaskScreenTexts, ON_OFF } from "../../strings/textLoader";
import addTaskScreenStyles from "../../styles/screens/addTask/addTaskScreen.styles";
import { addTaskPriorityVals } from "../../utils/dropDownValues";

const useEditTaskViewModel = (params) => {
    const {setHeader, popupText, popupVisible, setPopupText, setPopupVisible, setLoading } = useContext(TaskContext);
    const styles = addTaskScreenStyles();
    const taskId = params.taskId;
    const navigation = useNavigation();
    const folderPath = `${RNFS.DocumentDirectoryPath}/TaskImages`;
    const updateTaskImageDestination = useRef('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [t_name, setT_name] = useState('');
    const [t_date, setT_date] = useState('');
    const [t_priority, setT_priority] = useState('');
    const [t_details, setT_details] = useState('');
    const [t_alarm, setT_alarm] = useState(false);
    const [t_picture, setT_picture] = useState('');
    const [t_tag, setT_tag] = useState('');
    const [nav,setNav] = useState(false);
    

    const updateTaskData = (taskData) => {
        try {
            setT_name(taskData?.task_name);
            setT_date(taskData?.task_date);
            setT_priority(taskData?.task_priority);
            setT_details(taskData?.task_details);
            setT_alarm(taskData?.task_alert === 1);
            setT_picture(taskData?.task_image);
            setT_tag(taskData?.task_tag);
        } catch (error) {
            setPopupText(commonTexts.ERROR_SOMETHING);
            setPopupVisible(true);
        }
    };

    useFocusEffect(
        useCallback(()=>{
            const fetchTaskData = async() => {
                try{
                    setLoading(true);
                    const taskData = await fetchTaskById(taskId);
                    if(!taskData){
                        throw new Error(commonTexts.ERROR_OCCURRED);
                    }

                    if(taskData?.task_is_completed === 1){
                        setLoading(false);
                        setPopupText(editTaskScreenTexts.COMPLETED_TASK_NO_EDIT);
                        setPopupVisible(true);
                        navigation.navigate('home');
                    }else{
                        updateTaskData(taskData);
                        setLoading(false);
                    }

                }catch(error){
                    setLoading(false);
                    setPopupText(commonTexts.ERROR_SOMETHING);
                    setPopupVisible(true);
                    navigation.navigate('home');
                }
            };
            fetchTaskData();

        },[taskId])
    );

      const editTaskImageSaver = async () => {
        try {
            const folderExists =await RNFS.exists(folderPath);
            if (!folderExists) {
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
                        updateTaskImageDestination.current = `${folderPath}/${`task_${Date.now()}.jpg`}`;
                        await RNFS.moveFile(
                            capturedImage.replace('file://', ''),
                            updateTaskImageDestination.current
                        )

                        if (await RNFS.exists(updateTaskImageDestination.current)) {
                            setT_picture(updateTaskImageDestination.current);
                        } else {
                            throw new Error(commonTexts.IMAGE_FAILED);
                        }
                    }
                }

            );
        } catch (error) {
            setPopupText(commonTexts.ERROR_SOMETHING);
            setPopupVisible(true);
        }

    };

    const handleDateUpdation = (_,date) => {
            try{
                if(date){
                    setT_date(date.toISOString().split('T')[0]);
                    setIsDatePickerVisible(false);
                }
            }catch(error){
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1:commonTexts.ERROR_OCCURRED,
                    visibilityTime:1800,
                    avoidKeyboard:true,
                    bottomOffset:180
                    
                });
            }
        };

    const handleTaskUpdate = async() => {
        try{
            setLoading(true);
            const updateRes = await updateTaskById(
                                    taskId,t_name,t_priority,t_details,t_alarm ? 1 : 0,t_picture,t_date,t_tag
                                );
            if(!updateRes) throw new Error(editTaskScreenTexts.UPDATE_FAILED);
            setPopupText(editTaskScreenTexts.UPDATE_SUCCESS);
            setNav(true);
        }catch(error){
            setPopupText(editTaskScreenTexts.UPDATE_FAILED);
        }finally{
            setLoading(false);
            setPopupVisible(true);
        }
    };

    const handleNavigation = () => {
        navigation.navigate('home');
    };

    return{
        editTaskScreenTexts,
        addTaskPriorityVals,
        ON_OFF,
        commonTexts,
        setHeader,
        styles,
        popupText,
        popupVisible,
        setPopupVisible,
        t_name,
        setT_name,
        t_date,
        setT_date,
        t_priority,
        setT_priority,
        t_details,
        setT_details,
        t_alarm,
        setT_alarm,
        t_picture,
        setT_picture,
        t_tag,
        setT_tag,
        editTaskImageSaver,
        handleTaskUpdate,
        isDatePickerVisible,
        setIsDatePickerVisible,
        handleDateUpdation,
        handleNavigation,
        nav,
        setNav
    };
};

export default useEditTaskViewModel;