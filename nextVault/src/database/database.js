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
                task_is_completed INTEGER DEFAULT 0
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
                task_tag
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            taskData.task_name,
            taskData.task_priority,
            taskData.task_details,
            taskData.task_alert ?? 0,
            taskData.task_image ?? null,
            taskData.task_date,
            taskData.task_tag
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
        if(res.changes === 1){
            return true;
        }
        return false;
    }catch(error){
        throw error;
    }
};