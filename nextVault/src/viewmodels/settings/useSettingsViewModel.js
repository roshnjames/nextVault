import { useContext, useState } from "react";
import { useWindowDimensions } from "react-native";
import { TaskContext } from "../../context/taskDetails";
import { deleteAllContents, deleteAllNotifications, fetchAllNotes, fetchAllTasks, fetchNotificationIds } from "../../database/database";
import { cancelAllScheduledNotifications } from "../../notification/notificationService";
import { generateDataPDF } from "../../pdf/pdfGenerator";
import { commonTexts, settingsScreenTexts } from "../../strings/textLoader";
import settingsScreenStyles from "../../styles/screens/settings/settingsScreen.styles";
import { settingsScreenContentList } from "../../utils/dropDownValues";

const useSettingsViewModel = () => {
    const { setHeader, setLoading, popupText, setPopupText, popupVisible, setPopupVisible } = useContext(TaskContext);
    const {height, width } = useWindowDimensions();
    const styles = settingsScreenStyles(height, width);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
    const [settingsPopupText, setSettingsPopupText] = useState('');
    const [selectedItem, setSelectedItem] = useState(0);

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
            console.log('[[[[',deleteRes,validNotificationIds)
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

            console.log('pdf location : ',taskPdfGenerated);
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

    const handleSettingsItemPress = (itemIndex) => {
        try{
            switch(itemIndex){
                case 0: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_NOTIFICATIONS_CONFIRM);
                        break;
                case 1: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_NOTIFICATIONS_CONFIRM);
                        break;
                case 2: setSettingsPopupText(settingsScreenTexts.DELETE_ALL_NOTES_CONFIRM);
                        break;
                case 3: setSettingsPopupText(settingsScreenTexts.DOWNLOAD_PDF_NOTES_CONFIRM);
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
            console.log('left button pressed => \n',selectedItem);
             switch(selectedItem){
                case 1: await handleDeleteAllNotifications();
                        break;
                case 2: await handleDeleteAllTasks();
                        break;
                case 3: await handleDeleteAllNotes();
                        break;
                case 4: await handleDownloadAllDataAsPDF();
                        break;
                // default: throw new Error(commonTexts.ERROR_SOMETHING);
            };
        }finally{
            setLoading(false);
            setPopupVisible(true);
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