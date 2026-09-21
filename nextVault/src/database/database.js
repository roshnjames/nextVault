import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db = null;

const createDatabase = async () => {
    if (!db) {

        return SQLite.openDatabase(
            {
                name: 'nextvault_data.db',
                location: 'default'
            }
        )
    }
};

export const initDatabase = async () => {
    try {
        db = await createDatabase();

        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS next_tasks (
                task_id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_name TEXT NOT NULL,
                task_priority INTEGER NOT NULL,
                task_details TEXT NOT NULL,
                task_alert INTEGER DEFAULT 0,
                task_image TEXT,
                task_date TEXT NOT NULL,
                task_tag TEXT NOT NULL,
                task_is_completed INTEGER DEFAULT 0
            );`
        );

        console.log('db and table created');
    } catch (error) {
        throw error;
    }
};

export const insertNewTask = async(taskData) => {
    console.log('insert date recieved :',JSON.stringify(taskData))
    return await db.executeSql(
        `INSERT INTO next_tasks(
                task_name,
                task_priority,
                task_details,
                task_alert,
                task_image,
                task_date,
                task_tag
        )
        VALUES(?,?,?,?,?,?,?)`,
        [
            taskData.task_name,
            taskData.task_priority,
            taskData.task_details,
            taskData.task_alert,
            taskData.task_image,
            taskData.task_date,
            taskData.task_tag
        ]
    );
};

export const fetchAllData = async(table_name) => {
    console.log('fetching alldata',table_name)
    const [result] = await db.executeSql(
        `SELECT * FROM ${table_name}`
    );
    console.log('result fetched',result.rows.raw());
}