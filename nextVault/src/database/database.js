import * as SQLite from 'expo-sqlite';

let db = null;

const createDatabase = async () => {
    console.log('createDatabase called...');
    if (!db) {
        console.log('DATABASE NOT CREATED, CREATING NOW...');
        db = await SQLite.openDatabaseAsync('nextvault_data.db');
    }
    console.log('RETURNING DB INSTANCE...');
    return db;
};

export const initDatabase = async () => {
    try {
        const database = await createDatabase();

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS next_tasks (
                task_id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_name TEXT NOT NULL,
                task_priority INTEGER NOT NULL,
                task_details TEXT NOT NULL,
                task_alert INTEGER DEFAULT 0,
                task_image TEXT,
                task_date TEXT NOT NULL,
                task_tag TEXT NOT NULL,
                task_is_completed INTEGER DEFAULT 0,
                task_time TEXT NOT NULL,
                task_notification_id TEXT
            );
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS next_notes (
                note_id INTEGER PRIMARY KEY AUTOINCREMENT,
                note_title TEXT NOT NULL,
                note_detail TEXT 
            );
        `);

        console.log('db and table created');
    } catch (error) {
        throw error;
    }
};

export const insertNewTask = async (taskData) => {
    try {
        const database = await createDatabase();
        const result = await database.runAsync(
            `INSERT INTO next_tasks (
                task_name,
                task_priority,
                task_details,
                task_alert,
                task_image,
                task_date,
                task_tag,
                task_time,
                task_notification_id
            )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            taskData.task_name,
            taskData.task_priority,
            taskData.task_details,
            taskData.task_alert ?? 0,
            taskData.task_image ?? null,
            taskData.task_date,
            taskData.task_tag,
            taskData.task_time,
            taskData.task_notification_id
        );

        console.log('task inserted:', result);

        return result;
    } catch (error) {
        console.error('Task insertion error:', error);
        throw error;
    }
};

export const fetchAllTasks = async (table_name = 'next_tasks') => {
    try {
        const database = await createDatabase();

        const result = await database.getAllAsync(
            `SELECT * FROM ${table_name}`
        );

        console.log('data fetched: \n',JSON.stringify(result))
        return result || [];
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async(taskId, table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const deleteQuery = `DELETE FROM ${table_name} WHERE task_id = ?`;
        const res = await database.runAsync(deleteQuery,[taskId]);
        return res.changes === 1;
    }catch(error){
        throw error;
    }
};

export const updateTaskCompletion = async(taskId, table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const updateQuery = `UPDATE ${table_name} SET task_is_completed = ? WHERE task_id = ?`;
        const updateRes = await database.runAsync(updateQuery,[1,taskId]);
        return updateRes.changes === 1;
    }catch(error){
        throw error;
    }
};

export const fetchTaskById = async(taskId, table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const fetchQuery = `SELECT * FROM ${table_name} WHERE task_id = ?`;
        const fetchRes = await database.getFirstAsync(fetchQuery,[taskId]);
        if(!fetchRes){
            return false;
        }
        return fetchRes;
    }catch(error){
        throw error;
    }
};

export const updateTaskById = async(t_id,t_name,t_priority,t_details,t_alarm,t_picture,t_date,t_tag,table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const updateQuery = `UPDATE ${table_name} SET
                             task_name = ?,
                             task_priority = ?,
                             task_details = ?,
                             task_alert = ?,
                             task_image = ?,
                             task_date = ?,
                             task_tag = ?
                            WHERE task_id = ?`;
        const updateRes = await database.runAsync(
                                updateQuery,
                                [t_name,t_priority,t_details,t_alarm,t_picture,t_date,t_tag,t_id]
                            );
        return updateRes.changes === 1;
    }catch(error){
        throw error;
    }
};

export const fetchTaskByDate = async(date, table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const fetchQuery = `SELECT * FROM ${table_name} WHERE task_date = ?`;
        const fetchRes = await database.getAllAsync(fetchQuery,[date]);
        if(!fetchRes) return false;
        return fetchRes;
    }catch(error){
        throw error;
    }
};

export const deleteTaskByDate = async(date, table_name = 'next_tasks') => {
    try{
        const database = await createDatabase();
        const deleteQuery = `DELETE FROM ${table_name} WHERE task_date = ?`;
        const res = await database.runAsync(deleteQuery,[date]);
        return res.changes;
    }catch(error){
        throw error;
    }
};

export const insertNewNote = async(noteTitle, noteDetail, table_name = 'next_notes') => {
    try{
        const database = await createDatabase();
        const insertQuery = `INSERT INTO ${table_name} (
                                    note_title,
                                    note_detail
                                ) VALUES (?, ?)`;
        const insertRes = await database.runAsync(insertQuery,[noteTitle,noteDetail]);
        return insertRes.changes === 1;
    }catch(error){
        throw error;
    }
};

export const fetchAllNotes = async(table_name = 'next_notes') => {
    try{
        const database = await createDatabase();
        const fetchQuery = `SELECT * FROM ${table_name}`;
        const fetchRes = await database.getAllAsync(fetchQuery);
        return fetchRes || [];
    }catch(error){
        throw error;
    }
};

export const fetchNoteById = async(noteId, table_name = 'next_notes') => {
    try{
        const database = await createDatabase();
        const fetchQuery = `SELECT * FROM ${table_name} WHERE note_id = ?`;
        const fetchRes = await database.getFirstAsync(fetchQuery,[noteId]);
        return fetchRes;
    }catch(error){
        throw error;
    }
};

export const updateNoteById = async (noteId, noteTitle, noteDetails, table_name = 'next_notes') => {
    try {
        const database = await createDatabase();
        const updateQuery = `UPDATE ${table_name} SET
                             note_title = ?,
                             note_detail = ?
                            WHERE note_id = ?`;
        const updateRes = await database.runAsync(
            updateQuery,
            [noteTitle, noteDetails, noteId]
        );
        return updateRes.changes === 1;
    } catch (error) {
        throw error;
    }
};

export const deleteNoteById = async(noteId, table_name = 'next_notes') => {
    try{
        const database = await createDatabase();
        const deleteQuery = `DELETE FROM ${table_name} WHERE note_id = ?`;
        const res = await database.runAsync(deleteQuery,[noteId]);
        return res.changes;
    }catch(error){
        throw error;
    }
};