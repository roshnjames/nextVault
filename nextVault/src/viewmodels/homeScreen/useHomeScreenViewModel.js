import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import Toast from 'react-native-toast-message';
import { TaskContext } from "../../context/taskDetails";
import { fetchAllTasks } from '../../database/database';
import { scheduleScreenButtons } from '../../images/imageLoader';
import { homeScreenTexts } from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const { loading, setLoading, setHeader, tasks, setTasks } = useContext(TaskContext);

    useFocusEffect(
        useCallback(() => {      
            const fetchTasks = async () => {
                try {
                    setLoading(true);
                    const tasks = await fetchAllTasks();
                    setTasks(tasks);
                    setLoading(false);
                } catch (error) {
                    Toast.show({
                        type:'error',
                        position:'bottom',
                        text1:'An error occurred...',
                        visibilityTime:1800,
                        avoidKeyboard:true,
                        bottomOffset:180
                        
                    });
                    setLoading(false);
                }
            };
            fetchTasks();
        }, [])
    );

    return {
        styles,
        loading,
        homeScreenTexts,
        setHeader,
        tasks,
        scheduleScreenButtons
    }
};

export default useHomeScreenViewModel;