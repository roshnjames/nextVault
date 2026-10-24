import { useContext, useState } from "react";
import { Linking, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { createAndSaveBackupFile, loadDataFromRestoreFile } from "../../backup/backupGeneration";
import { TaskContext } from "../../context/taskDetails";
import { deleteAllContents, deleteAllNotifications, fetchAllNotes, fetchAllTasks, fetchNotificationIds, insertNewNote, insertNewTask, updateTaskWithNotificationId } from "../../database/database";
import { cancelAllScheduledNotifications, scheduleTaskNotification } from "../../notification/notificationService";
import { generateDataPDF } from "../../pdf/pdfGenerator";
import { commonTexts, settingsScreenTexts } from "../../strings/textLoader";
import settingsScreenStyles from "../../styles/screens/settings/settingsScreen.styles";
import { EXTERNAL_LINKS, settingsScreenContentList } from "../../utils/dropDownValues";

const useSettingsViewModel = () => {
    const { setHeader, setLoading, popupText, setPopupText, popupVisible, setPopupVisible } = useContext(TaskContext);
    const {height, width } = useWindowDimensions();
    const styles = settingsScreenStyles(height, width);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
    const [settingsPopupText, setSettingsPopupText] = useState('');
    const [selectedItem, setSelectedItem] = useState(0);
    let taskContent = {};

    const handleDeleteAllNotifications = async () => {
        try {
            const fetchedNotificationIds = await fetchNotificationIds();
            const validNotificationIds = fetchedNotificationIds.filter(
                id => id && id.task_notification_id !== '-'
            );
            if (validNotificationIds?.length === 0) {
                throw new Error('empty');
            }
            await cancelAllScheduledNotifications();
            const deleteRes = await deleteAllNotifications();
            if (!deleteRes || deleteRes < validNotificationIds?.length) {
                throw new Error('failed');
            }
            setPopupText(settingsScreenTexts.DELETE_SUCCESS_ALL_NOTIFICATION)
            return true;
        } catch (error) {
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.NOTIFICATION_EMPTY);
            } else {
                setPopupText(settingsScreenTexts.DELETE_FAILED_ALL_NOTIFICATION);
            }
        }
    };

    const handleDeleteAllTasks = async() => {
         try {
            const fetchCurrentTasks = await fetchAllTasks();
            if (fetchCurrentTasks?.length === 0) {
                throw new Error('empty');
            }
            const deleteRes = await deleteAllContents();
            if (!deleteRes || deleteRes !== fetchCurrentTasks?.length) {
                throw new Error('failed');
            }
            setPopupText(settingsScreenTexts.DELETE_SUCCESS_ALL_TASK)
            return true;
        } catch (error) {
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.TASK_EMPTY);
            } else {
                setPopupText(settingsScreenTexts.DELETE_FAILED_ALL_TASK);
            }
        }
    };

     const handleDeleteAllNotes = async() => {
         try {
            const fetchCurrentNotes = await fetchAllNotes();
            if (fetchCurrentNotes?.length === 0) {
                throw new Error('empty');
            }
            const deleteRes = await deleteAllContents('next_notes');
            if (!deleteRes || deleteRes !== fetchCurrentNotes?.length) {
                throw new Error('failed');
            }
            setPopupText(settingsScreenTexts.DELETE_SUCCESS_ALL_NOTE)
            return true;
        } catch (error) {
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.NOTE_EMPTY);
            } else {
                setPopupText(settingsScreenTexts.DELETE_FAILED_ALL_NOTE);
            }
        }
    };

    const handleDownloadAllDataAsPDF = async() => {
        try{
            const currentTasks = await fetchAllTasks();
            const currentNotes = await fetchAllNotes();
            if (currentTasks?.length === 0 && currentNotes?.length === 0) throw new Error('empty');

            const taskPdfGenerated = await generateDataPDF(currentTasks,currentNotes);
            if (!taskPdfGenerated) throw new Error(commonTexts.FAILED);

            setPopupText(settingsScreenTexts.PDF_DOWNLOAD_SUCCESS);
            return true;
        }catch(error){
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.DB_EMPTY);
            } else if(error.message === 'permission'){
                setPopupText(commonTexts.STORAGE_PERMISSION);
            }else{
                setPopupText(commonTexts.ERROR_OCCURRED);
            }
        }
    };

    const handleDownloadAllDataAsBackup = async() => {
        try{
            const fetchedAllTasks = await fetchAllTasks();
            const allTasks = fetchedAllTasks?.map(({ task_id,task_image,task_notification_id, ...task }) => task)
            const fetchedallNotes = await fetchAllNotes();
            const allNotes = fetchedallNotes?.map(({note_id,...note}) => note);
            if (allTasks.length === 0 && allNotes.length === 0) throw new Error('empty');
            const allData = {
                tasks: allTasks,
                notes: allNotes
            };

            const saveData = await createAndSaveBackupFile(allData);
            if(!saveData) throw new Error('failed');
            setPopupText(settingsScreenTexts.DOWNLOAD_BACKUP_SUCCESS)
        }catch(error){
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.DB_EMPTY);
            }else if (error.message === 'permission') {
                setPopupText(settingsScreenTexts.STORAGE_PERMISSION);
            } else {
                setPopupText(settingsScreenTexts.DOWNLOAD_BACKUP_FAILURE);
            }
        }
    };

    const handleRestoreAllDataFromBackup = async () => {
        try {
            const data = await loadDataFromRestoreFile();
            const taskData = data?.tasks;
            const noteData = data?.notes;

            if ((taskData?.length ?? 0) === 0 && (noteData?.length ?? 0) === 0) throw new Error('empty');

            for (const task of taskData ?? []) {
                let alarmNeeded = false;
                if (Number(task.task_alert) === 1) {
                    const [year, month, day] = task.task_date.split('-').map(Number);
                    const [hour, min] = task.task_time.split(':').map(Number);

                    const reminderTimestamp = new Date(
                        year,
                        month - 1,
                        day,
                        hour,
                        min,
                        0
                    );
                    alarmNeeded = reminderTimestamp.getTime() > Date.now();
                }
                taskContent.task_name = task.task_name;
                taskContent.task_priority = task.task_priority;
                taskContent.task_details = task.task_details;
                taskContent.task_alert = alarmNeeded ? 1 : 0 ;
                taskContent.task_date = task.task_date;
                taskContent.task_tag = task.task_tag;
                taskContent.task_is_completed = task.task_is_completed;
                taskContent.task_time = task.task_time;
                taskContent.task_notification_id = '-';

                const insertRes = await insertNewTask(taskContent);

                if (Object.keys(insertRes).length > 0 && insertRes.changes > 0) {
                    if (alarmNeeded) {
                        const newTaskId = insertRes?.lastInsertRowId;

                        const task_notification_id = await scheduleTaskNotification(
                            newTaskId,
                            taskContent.task_name,
                            taskContent.task_details,
                            taskContent.task_date,
                            taskContent.task_time
                        );

                        if (!task_notification_id) {
                            Toast.show({
                                type: 'error',
                                position: 'bottom',
                                text1: settingsScreenTexts.NOTIFICATION_SET_FAILED,
                                visibilityTime: 3000,
                                avoidKeyboard: true,
                                bottomOffset: 250

                            });
                        } else if (task_notification_id && task_notification_id !== 'past') {
                            const _ = await updateTaskWithNotificationId(
                                newTaskId,
                                task_notification_id,
                            );
                        }
                    }
                } else {
                    throw new Error('task_failed');
                };
                taskContent = {};
            };

            for (const note of noteData ?? []) {
                const insertRes = await insertNewNote(note.note_title, note.note_detail);
                if (!insertRes) throw new Error('note_failed')
            };

            setPopupText(settingsScreenTexts.RESTORE_UPLOAD_SUCCESS);
        } catch (error) {
            if (error.message === 'empty') {
                setPopupText(settingsScreenTexts.RESTORE_FILE_EMPTY);
            } else if (error.message === 'cancelled') {
                setPopupText(settingsScreenTexts.RESTORE_FILE_NOT_CHOSEN);
            } else if (error.message === 'task_failed') {
                setPopupText(settingsScreenTexts.RESTORE_TASK_FAILED);
            } else if (error.message === 'note_failed') {
                setPopupText(settingsScreenTexts.RESTORE_NOTE_FAILED);
            } else {
                setPopupText(settingsScreenTexts.UPLOAD_RESTORE_FAILURE);
            }
        }
    };

    const handleOpenPrivacyPolicyExternally = async() => {
        try{
            const privacyPolicyURL = EXTERNAL_LINKS.PRIVACY_POLICY;
            await Linking.openURL(privacyPolicyURL);
        }catch(error){
            setPopupText(commonTexts.ERROR_OCCURRED);
        }
    };

    const handleSettingsItemPress = (itemIndex) => {
        try{
            switch(itemIndex){
                case 0: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_NOTIFICATIONS_CONFIRM);
                        break;
                case 1: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_TASKS_CONFIRM);
                        break;
                case 2: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_NOTES_CONFIRM);
                        break;
                case 3: setSettingsPopupText(settingsScreenTexts.DOWNLOAD_PDF_NOTES_CONFIRM);
                        break;
                case 4: setSettingsPopupText(settingsScreenTexts.DOWNLOAD_BACKUP_CONFIRM);
                        break;
                case 5: setSettingsPopupText(settingsScreenTexts.RESTORE_BACKUP_CONFIRM);
                        break;
                case 6: setSettingsPopupText(settingsScreenTexts.PRIVACY_POLICY_CONFIRM);
                        break;
                default: setSettingsPopupText(settingsScreenTexts.RETRY);
                        break;
            };
            setSettingsPopupVisible(true);
        }catch(error){
            setPopupText(commonTexts.ERROR_SOMETHING);
            setPopupVisible(true);
        }
    };

    const handleLeftButtonPress = async() => {
        try{
            setPopupText('');
            setLoading(true);
             switch(selectedItem){
                case 1: await handleDeleteAllNotifications();
                        break;
                case 2: await handleDeleteAllTasks();
                        break;
                case 3: await handleDeleteAllNotes();
                        break;
                case 4: await handleDownloadAllDataAsPDF();
                        break;
                case 5: await handleDownloadAllDataAsBackup();
                        break;
                case 6: await handleRestoreAllDataFromBackup();
                        break;
                case 7: await handleOpenPrivacyPolicyExternally();
                        break;
                default: setPopupText(commonTexts.ERROR_SOMETHING);
                        break;
            };
        }finally{
            setLoading(false);
            (selectedItem !== 7) && setPopupVisible(true);
        }
    };

    return{
        setHeader,
        settingsScreenTexts,
        styles,
        settingsScreenContentList,
        handleSettingsItemPress,
        setSelectedItem,
        popupText,
        popupVisible,
        setPopupVisible,
        settingsPopupText,
        settingsPopupVisible, 
        setSettingsPopupVisible,
        handleLeftButtonPress
    }
};

export default useSettingsViewModel;