import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import RNFS from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { TaskContext } from '../../context/taskDetails';
import { insertNewTask, updateTaskWithNotificationId } from '../../database/database';
import { scheduleTaskNotification } from '../../notification/notificationService';
import { addTaskScreenTexts, commonTexts, ON_OFF } from '../../strings/textLoader';
import addTaskScreenStyles from '../../styles/screens/addTask/addTaskScreen.styles';
import { addTaskPriorityVals } from '../../utils/dropDownValues';

const useAddTaskViewModel = ({ route }) => {
    const navigation = useNavigation();
    const date = route?.params.date;
    const now = new Date();
    const { 
        setHeader, 
        setLoading, 
        setPopupVisible, 
        setPopupText, 
        popupVisible, 
        popupText, 
        notificationPermission, 
        setNotificationPermission,
        appState 
    } = useContext(TaskContext);
    const styles = addTaskScreenStyles();

    const [addTaskNewTask, setAddTaskNewTask] = useState('');
    const [addTaskNewTaskDetails, setAddTaskNewTaskDetails] = useState('');
    const [addTaskPriority, setAddTaskPriority] = useState(addTaskPriorityVals[1].value);
    const [addTaskAlertEnabled, setAddTaskAlertEnabled] = useState(true);
    const [addTaskImageCaptured, setAddTaskImageCaptured] = useState(null);
    const folderPath = `${RNFS.DocumentDirectoryPath}/TaskImages`;
    const folderExists = useRef(false);
    const addTaskImageDestination = useRef('');
    const [addTaskTag, setAddTaskTag] = useState('Low');
    const newTaskCreated = useRef({});
    const [taskTime, setTaskTime] = useState(`10:00`);
    const [isTimePickerVisible, setIsShowTimePickerVisible] = useState(false);
    const new_task_id = useRef('');
    const resolveAppActive = useRef(null);
    const resolveEnablePopup = useRef(null);
    const updatedNotificationPermission = useRef(notificationPermission);
    const [notificationPopup, setNotificationPopup] = useState(false);

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
    }, []);

    useEffect(() => {
        if (appState === 'active' && resolveAppActive.current) {
            resolveAppActive.current(true);
            resolveAppActive.current = null;
        }
    }, [appState]);

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
           Toast.show({
                type:'error',
                position:'bottom',
                text1:addTaskScreenTexts.TASK_IMAGE_FAILURE,
                visibilityTime:3000,
                avoidKeyboard:true,
                bottomOffset:250
            });
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
        setTaskTime('10:00');
        setAddTaskTag(1);
    }

    const isAppinForeground = () => {
            return new Promise((resolve) => {
            resolveAppActive.current = resolve;
        })
    };
    
    const isPopupContinuePressed = () => {
        return new Promise((resolve) => {
            resolveEnablePopup.current = resolve;
        })
    };

    const handleNavigateToAppSettings = () =>{
        setNotificationPopup(false);
        if (resolveEnablePopup.current) {
            resolveEnablePopup.current(true);
            resolveEnablePopup.current = null;
        }
    };

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
                newTaskCreated.current.task_time = taskTime;
                newTaskCreated.current.task_notification_id = '-';
                
                const [year,month,day] = date.split('-');
                const [hour,min] = taskTime.split(':');

                const formedDate = new Date(
                    year,
                    month-1,
                    day,
                    hour,
                    min,
                    0
                );

                if(formedDate.getTime() <= Date.now()){
                    throw new Error('past');
                };

                while(!updatedNotificationPermission.current){
                    const appinForeground = isAppinForeground();
                    const isPopupPressed = isPopupContinuePressed();
                    setPopupText(addTaskScreenTexts.TASK_NOTIFICATION_ENABLE);
                    setNotificationPopup(true);
                    await isPopupPressed;
                    await Linking.openSettings();
                    await appinForeground;
                    const {status : permission} = await Notifications.getPermissionsAsync();
                    updatedNotificationPermission.current = permission === 'granted';
                    if(updatedNotificationPermission.current)
                        setNotificationPermission(updatedNotificationPermission.current);
                };

                const res = await insertNewTask(newTaskCreated.current);
                if (Object.keys(res).length > 0 && res.changes > 0) {
                    new_task_id.current = res?.lastInsertRowId;

                    const task_notification_id = await scheduleTaskNotification(
                        new_task_id.current,
                        newTaskCreated.current.task_name,
                        newTaskCreated.current.task_details,
                        newTaskCreated.current.task_date,
                        newTaskCreated.current.task_time
                    );

                    if(!task_notification_id) throw new Error(commonTexts.ERROR_OCCURRED);

                    const updateNotificationIdRes = await updateTaskWithNotificationId(
                                                        new_task_id.current,
                                                        task_notification_id,
                                                    );
                    if(!updateNotificationIdRes) throw new Error(commonTexts.FAILED);
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
                    throw new Error('Failed');             }
            } else {
                throw new Error('fields');
            }
        } catch (error) {
            if (error.message === 'past') {
                setPopupText(addTaskScreenTexts.TASK_PAST_TIME);
            } else if(error.message === 'fields'){
                setPopupText(addTaskScreenTexts.TASK_FIELD_EMPTY);
            }else{
                setPopupText(addTaskScreenTexts.TASK_ADD_FAILED);
            }
            setPopupVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const getTImePickerValue = () => {
        const [hour, min] = taskTime.split(':').map(Number);
        now.setHours(hour,min,0,0);
        return now;
    };

    const handleTimeUpdation = (_,time) =>{
        try{
            if(time){
                const hour = String(time?.getHours()).padStart(2, '0');
                const min = String(time?.getMinutes()).padStart(2, '0');
                setTaskTime(`${hour}:${min}`);
                setIsShowTimePickerVisible(false);
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
        popupText,
        taskTime, 
        setTaskTime,
        isTimePickerVisible, 
        setIsShowTimePickerVisible,
        handleTimeUpdation,
        getTImePickerValue,
        notificationPopup, 
        setNotificationPopup,
        handleNavigateToAppSettings
    }

}
export default useAddTaskViewModel;