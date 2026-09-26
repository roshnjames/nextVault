import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { TaskContext } from "../../context/taskDetails";
import { fetchAllTasks } from '../../database/database';
import { homeScreenTexts } from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const { loading, setLoading, setHeader, setTasks } = useContext(TaskContext);

    useFocusEffect(
        useCallback(() => {      
            const fetchTasks = async () => {
                try {
                    setLoading(true);
                    const tasks = await fetchAllTasks();
                    setTasks(tasks);
                    console.log('Fetched tasks:+++++++++++\n', tasks);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
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
        setHeader
    }

};

export default useHomeScreenViewModel;