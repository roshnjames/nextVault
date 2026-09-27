import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import Toast from 'react-native-toast-message';
import { TaskContext } from "../../context/taskDetails";
import { deleteTask, fetchAllTasks } from '../../database/database';
import { scheduleScreenButtons } from '../../images/imageLoader';
import { commonTexts, homeScreenTexts, scheduleScreenTexts } from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const { loading, 
        setLoading, 
        setHeader, 
        tasks, 
        setTasks,
        popupVisible,
        setPopupVisible,
        popupText,
        setPopupText,
        setDisableBackButton
     } = useContext(TaskContext);
     const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {      
            const fetchTasks = async () => {
                try {
                    setLoading(true);
                    const tasks = await fetchAllTasks();
                    setTasks(tasks);
                } catch (error) {
                    Toast.show({
                        type:'error',
                        position:'bottom',
                        text1:commonTexts.ERROR_OCCURRED,
                        visibilityTime:1800,
                        avoidKeyboard:true,
                        bottomOffset:180
                        
                    });
                } finally{
                    setLoading(false);
                }
            };
            setDisableBackButton(true)
            fetchTasks();

        return() =>{
            setDisableBackButton(false);
        }
        }, [])
    );

    const handleAddTask = ()=>{
        navigation.navigate('schedule');
    };

    const handleDeleteTask = async(taskId) => {
        try{
            const delRes = await deleteTask(taskId);
            if(!delRes) throw new Error(commonTexts.FAILED);
            const updatedTasks = await fetchAllTasks();
            setTasks(updatedTasks);
            setPopupText(homeScreenTexts.DELETE_SUCCESS);
        }catch(error){
            setPopupText(homeScreenTexts.DELETE_FAILED);
        }finally{
            setPopupVisible(true);
        }
    };

    return {
        styles,
        loading,
        homeScreenTexts,
        scheduleScreenTexts,
        setHeader,
        tasks,
        scheduleScreenButtons,
        handleDeleteTask,
        popupVisible,
        setPopupVisible,
        popupText,
        handleAddTask
    }
};

export default useHomeScreenViewModel;