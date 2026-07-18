import SQLite from 'react-native-sqlite-storage';

export const initDatabase = async() => {
    const db  = SQLite.openDatabase(
        {
            name:'nextvault_data.db',
            location:'default'
        },
        ()=>{
            console.log('db initialized...');
        },
        (error) => {
            throw new Error('DB failure');
        }
    )
}