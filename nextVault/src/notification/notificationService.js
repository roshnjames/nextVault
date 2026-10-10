import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';


export const requestNotificationPermission = async() => {
    try{
        if(Platform.OS === 'android'){
            await Notifications.setNotificationChannelAsync(
                'task-notification',
                { 
                    name: 'Task Reminders', 
                    importance: Notifications.AndroidImportance.MAX, 
                    vibrationPattern: [0, 250, 250, 250], 
                    enableVibrate: true,
                    enableLights: true,
                    sound: true, 
                }
            );
        }
        let finalPermission = '';
        const {status : existingPermission} = await Notifications.getPermissionsAsync();

        finalPermission = existingPermission;
        if(existingPermission !== 'granted'){
            const {status : latestPermission} = await Notifications.requestPermissionsAsync();
            finalPermission = latestPermission;
        }

        return finalPermission === 'granted';
    }catch(error){
        console.error('error occurred in notification permission',error);
        return false;
    }
};


export const scheduleTaskNotification = async(task_id,name,date,time) => {
    try{
        console.log('before value chck', date, time);
        if(!date || !time) return false;

        const [year,month,day] = date.split('-').map(Number);
        const [hour,min] = time.split(':').map(Number);

        const reminderTimestamp = new Date(
            year,
            month-1,
            day,
            hour,
            min,
            0
        );
        console.log('Reminder ms:', reminderTimestamp.getTime());
console.log('Current ms:', Date.now());

        console.log('beforepast check',reminderTimestamp)
        if(reminderTimestamp.getTime() <= Date.now()) throw new Error('past');

        console.log('afterpast chcke');
        const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Upcoming activity',
                    body: name,
                    sound: true,
                    data: { taskId: task_id },
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                    date: reminderTimestamp,
                    ...(Platform.OS === 'android' ? {channelId : 'task-notification'} : {}),
                },
            });

            console.log('notificaitonis ',notificationId)
        return notificationId;
    }catch(error){
        console.log('erorro',error);
        throw error;
    }
};