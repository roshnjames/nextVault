import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

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
       
        if(reminderTimestamp.getTime() <= Date.now()) return 'past';

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
                    ...(Platform.OS === 'android' ? {channelId : 'tn-notification'} : {}),
                },
            });

        return notificationId || false;
    }catch(error){
        console.log('erorro',error);
        throw error;
    }
};

export const cancelScheduledNotification = async(notificationId) => { 
    try{
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        return true;
    }catch(error){
        throw error;
    }
};

export const cancelAllScheduledNotifications = async() => { 
    try{
        await Notifications.cancelAllScheduledNotificationsAsync();
        return true;
    }catch(error){
        throw error;
    }
};