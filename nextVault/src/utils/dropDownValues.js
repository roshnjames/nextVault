import { Dimensions, PixelRatio } from 'react-native';
import { settingsScreenTexts } from "../strings/textLoader";

const BASE_WIDTH = 380;

export const scaleFontSize = (size) => {
    const screenWidth = Dimensions.get('window').width;
    const scale = screenWidth / BASE_WIDTH;
    const adjustedScale = Math.max(0.75, Math.min(scale, 1));
    return PixelRatio.roundToNearestPixel(size * adjustedScale);
};

export const addTaskPriorityVals = [
    {label : 'Low',value:1},
    {label : 'Medium',value:2},
    {label : 'High',value:3},
    {label : 'Important',value:4},
    {label : 'Urgent',value:5},
];

export const settingsScreenContentList = [
    {value : 1, label : settingsScreenTexts.DELETE_ALL_NOTIFICATIONS,  details: settingsScreenTexts.DELETE_ALL_NOTIFICATIONS_DETAILS},
    {value : 2, label : settingsScreenTexts.DELETE_ALL_TASKS, details: settingsScreenTexts.DELETE_ALL_TASKS_DETAILS},
    {value : 3, label : settingsScreenTexts.DELETE_ALL_NOTES, details: settingsScreenTexts.DELETE_ALL_NOTES_DETAILS},
    {value : 4, label : settingsScreenTexts.DOWNLOAD_PDF, details: settingsScreenTexts.DOWNLOAD_PDF_DETAILS},
    {value : 5, label : settingsScreenTexts.DOWNLOAD_BACKUP, details: settingsScreenTexts.DOWNLOAD_BACKUP_DETAILS},
    {value : 6, label : settingsScreenTexts.RESTORE_BACKUP, details: settingsScreenTexts.RESTORE_BACKUP_DETAILS},
    {value : 7, label : settingsScreenTexts.PRIVACY_POLICY, details: settingsScreenTexts.PRIVACY_POLICY_DETAILS},
    {value : 0, label : settingsScreenTexts.APP_INFO, details: settingsScreenTexts.APP_INFO_DETAILS},
    {value : 0, label : settingsScreenTexts.DEV_INFO, details: settingsScreenTexts.DEV_INFO_DETAILS},
];

export const EXTERNAL_LINKS = {
    PRIVACY_POLICY : `https://roshnjames.github.io/privacy-policy/`,
};

