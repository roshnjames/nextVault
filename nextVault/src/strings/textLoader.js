export const ON_OFF ={
    ONN:'ON',
    OFF:'OFF'
};

export const colorValues = {
    RED:'rgb(199, 47, 47)',
    ORANGE:'rgb(213, 96, 33)',
    PINK:'rgb(204, 178, 11)',
    BLUE:'rgb(37, 77, 137)',
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
    DATA_FETCH_FAILED:"Failed to fetch data..."
};

export const bottomMenuTexts = {
    CURRENT_TASK: "Tasks",
    EDIT_TASKS: "Notes",
    CALENDAR: "Schedule",
};

export const scheduleScreenTexts ={
    HEADING:"Schedule task here!",
    ADD_TASK:"Add new task...",
    SELECT_DATE:"Select a day!",
    DELETE_TASK:(totalTasks) => `Delete ${totalTasks} task of the day`,
    EDIT_TASK:"Edit task",
    DAY_TASKS:(totalTasks) => `${totalTasks} task set for the day.`,
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
    TASK_NOTIFICATION_ENABLE:"Enable notifications!",
    TASK_ADD_FAILED:"Failed to add task...\nRetry",
    TASK_FIELD_EMPTY:"Please enter the required fields!",
    TASK_IMAGE_FAILURE:"Failed to capture image..."
};

export const homeScreenTexts = {
    YOUR_TASKS:"Your Tasks",
    TASKS:"Tasks",
    SELECT_DATE:"Select Date",
    DELETE_SUCCESS:"Task Deleted!",
    DELETE_FAILED:"Failed to Delete..."
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
    UPDATE_SUCCESS:"Task updated!"
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