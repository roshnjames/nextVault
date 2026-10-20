import Constants from 'expo-constants';

export const ON_OFF ={
    ONN:'ON',
    OFF:'OFF'
};

export const colorValues = {
    RED:'rgb(199, 47, 47)',
    ORANGE:'rgb(213, 96, 33)',
    PINK:'rgb(204, 178, 11)',
    BLUE:'rgb(84, 131, 201)',
    CYAN:'rgb(40, 164, 167)',
    GREEN:'rgb(64, 177, 62)',
};

export const commonTexts = {
    OK:'OK',
    CANCEL:'Cancel',
    SUBMIT:"Submit",
    UPDATE:"Update",
    CANCELLED : "Cancelled",
    ERROR_OCCURRED:'An error occurred...',
    ERROR_SOMETHING : "Something went wrong!",
    IMAGE_FAILED:'Failed to save image!',
    FAILED:'Failed...',
    DATA_FETCH_FAILED:"Failed to fetch data...",
    STORAGE_PERMISSION:"File not Saved locally!"
};

export const bottomMenuTexts = {
    CURRENT_TASK: "Tasks",
    EDIT_TASKS: "Notes",
    CALENDAR: "Schedule",
};

export const scheduleScreenTexts ={
    HEADING:"Schedule",
    ADD_TASK:"Add new task...",
    SELECT_DATE:"Select a day!",
    DELETE_TASK:(totalTasks) => `Delete ${totalTasks} task of the day`,
    EDIT_TASK:"Edit task",
    DAY_TASKS:(totalTasks) => `${totalTasks} task set for the day.`,
    DATE_PAST:"Past days cannot be selected!"
};

export const addTaskScreenTexts = {
    HEADING:"Add new Task",
    TASK_NAME:"Task Name",
    TASK_DESC:"Details",
    TASK_PRIORITY:"Priority",
    TASK_ALERT:"Alert Me",
    TASK_TIME:"Choose Time",
    TASK_IMAGE:"Take picture",
    TASK_IMAGE_CAPTURE:'Open Camera',
    TASK_RECAPTURE:'Recapture',
    TASK_TAG:'Tag',
    TASK_PAST_TIME:"Cannot set past time...",
    TASK_NOTIFICATION_ENABLE:"Enable notifications!\n please enable sound also",
    TASK_ADD_FAILED:"Failed to add task...\nRetry",
    TASK_FIELD_EMPTY:"Please enter the required fields!",
    TASK_IMAGE_FAILURE:"Failed to capture image..."
};

export const homeScreenTexts = {
    YOUR_TASKS:"Tasks",
    TASKS:"Tasks",
    SELECT_DATE:"Select Date",
    DELETE_SUCCESS:"Task Deleted!",
    DELETE_FAILED:"Failed to Delete...",
    PENDING_TASKS:"Pending..."
};

export const editTaskScreenTexts = {
    EDIT_TASK:" Edit Task",
    COMPLETED_TASK_NO_EDIT:"Unable to update...\nAlready completed task!",
    HEADING:"Add new Task",
    TASK_NAME:"Modify Name",
    TASK_DATE:"Change Date",
    TASK_DESC:"Update Details",
    TASK_PRIORITY:"Change Priority",
    TASK_ALERT:"Alert Me",
    TASK_UPDATE_TIME:"Update time",
    TASK_IMAGE:"Update picture",
    TASK_IMAGE_CAPTURE:'Open Camera',
    TASK_RECAPTURE:'Recapture',
    TASK_TAG:'Modify Tag',
    UPDATE_FAILED:"Failed to update...",
    UPDATE_SUCCESS:"Task updated!",
    UPCOMING_DATE:"Please select upcoming date and time..."
};

export const noteScreenTexts ={
    HEADER:"Notes",
    NOTE_OPEN_FAILED:"Failed to open...",
    NEW_NOTE:"Create new note",
    EDIT_NOTE:"Edit note",
    NOTE_TITLE:"Note Title",
    NOTE_DESC:"Add note here",
    NOTE_SAVE:"Save note",
    NOTE_SAVE_SUCCESS:"Note saved!",
    NOTE_UPDATE_SUCCESS:"Note updated!",
    NOTE_DELETE:"Delete Note",
    NOTE_DELETE_SUCCESS:"Deleted!"
};

export const settingsScreenTexts = {
    HEADER:"Settings",
    RETRY:"Something went wrong...\nPlease retry!",
    DELETE_ALL_NOTIFICATIONS:"Delete all notifications",
    DELETE_ALL_NOTIFICATIONS_DETAILS:"This will delete all existing notifications",
    DELETE_ALL_TASKS:"Delete all tasks", 
    DELETE_ALL_TASKS_DETAILS:"This will delete all existing tasks", 
    DELETE_ALL_NOTES:"Delete all notes", 
    DELETE_ALL_NOTES_DETAILS:"This will delete all existing notes",
    DOWNLOAD_PDF:"Download data as PDF",
    DOWNLOAD_PDF_DETAILS:"Download tasks and notes as PDF to save locally",
    APP_INFO:"App info",
    APP_INFO_DETAILS:`Ver : ${Constants.expoConfig?.version || '1.0.0'}`, 
    DEV_INFO:"Dev info", 
    DEV_INFO_DETAILS:(dev = 'roshinjames') => `${dev} :)`,
    DELETE_ALL_NOTIFICATIONS_CONFIRM:"Are you sure to delete all set Notificaions?",
    DELETE_ALL_TASKS_CONFIRM:"Are you sure to delete all set Tasks?",
    DELETE_ALL_NOTES_CONFIRM:"Are you sure to delete all saved Notes?",
    DOWNLOAD_PDF_NOTES_CONFIRM:"This will download all set tasks and saved notes into a single PDF file.",
    DOWNLOAD_BACKUP_CONFIRM:"This will download app data as a backup file",
    RESTORE_BACKUP_CONFIRM:"Upload backup file here to restore data",
    DELETE_SUCCESS_ALL_NOTIFICATION:"All notification deleted!",
    DELETE_FAILED_ALL_NOTIFICATION:"Failed to delete all notification...",
    NOTIFICATION_EMPTY:"No existing notifications...",
    TASK_EMPTY:"No existing tasks...",
    DELETE_SUCCESS_ALL_TASK:"All tasks deleted!",
    DELETE_FAILED_ALL_TASK:"Failed to delete all tasks...",
    NOTE_EMPTY:"No existing notes...",
    DELETE_SUCCESS_ALL_NOTE:"All notes deleted!",
    DELETE_FAILED_ALL_NOTE:"Failed to delete all notes...",
    DB_EMPTY:"No existing data...",
    RESTORE_FILE_EMPTY:"No data in chosen file",
    PDF_DOWNLOAD_SUCCESS:"PDF download success!",
    DOWNLOAD_BACKUP:"Download backup",
    DOWNLOAD_BACKUP_DETAILS:"Download backup file",
    RESTORE_BACKUP:"Restore data",
    RESTORE_BACKUP_DETAILS:"Restore data from backup file",
    DOWNLOAD_BACKUP_FAILURE:"Backup download failed...",
    UPLOAD_RESTORE_FAILURE:"Failed to restore data...",
    DOWNLOAD_BACKUP_SUCCESS:"Backup downloaded!",
    RESTORE_UPLOAD_SUCCESS:"Restore Success!",
    RESTORE_UPLOAD_FAILURE:"Restore file upload failed...",
    RESTORE_FILE_NOT_CHOSEN:"No file was selected...",
    STORAGE_PERMISSION:"Download failed\nPlease provide storage access",
    NOTIFICATION_SET_FAILED:"Failed to set Notification...",
    RESTORE_TASK_FAILED:"Failed to restore all tasks...",
    RESTORE_NOTE_FAILED:"Failed to restore all notes..."
};