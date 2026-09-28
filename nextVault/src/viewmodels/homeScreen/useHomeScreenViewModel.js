import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { TaskContext } from "../../context/taskDetails";
import { deleteTask, fetchAllTasks, updateTaskCompletion } from '../../database/database';
import { scheduleScreenButtons } from '../../images/imageLoader';
import { colorValues, commonTexts, homeScreenTexts, scheduleScreenTexts } from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";
import { addTaskPriorityVals } from '../../utils/dropDownValues';


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const { 
        loading, 
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
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

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
            setShowDatePicker(false);
        }
        }, [])
    );

    useEffect(()=>{
        const filtered = tasks.filter(task => task.task_date === selectedDate);
        setFilteredTasks(filtered);
    },[tasks,selectedDate])

    const handleTaskColor = (priority = addTaskPriorityVals[1].label,isCompleted = false ) => {
        if(isCompleted === 1) return colorValues.GREEN;

        switch(priority){
            case addTaskPriorityVals[0].value:
                return colorValues.CYAN;
            case addTaskPriorityVals[1].value:
                return colorValues.BLUE;
            case addTaskPriorityVals[2].value:
                return colorValues.PINK;
            case addTaskPriorityVals[3].value:
                return colorValues.ORANGE;
            case addTaskPriorityVals[4].value:
                return colorValues.RED;
            default:
                return colorValues.BLUE;
        };
    };

    const handleAddTask = ()=>{
        navigation.navigate('schedule');
    };

    const handleDateSelection = (_,date) => {
        try{
            if(date){
                setSelectedDate(date.toISOString().split('T')[0]);
                setShowDatePicker(false);
            }
        }catch(error){
            Toast.show({
                type:'error',
                position:'bottom',
                text1:commonTexts.ERROR_OCCURRED,
                visibilityTime:1800,
                avoidKeyboard:true,
                bottomOffset:180
                
            });
        }
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

    const handleTaskCompletion = async(taskId) => {
        try{
            const res = await updateTaskCompletion(taskId);
            if(!res) throw new Error(commonTexts.ERROR_OCCURRED);
            const updatedTasks = await fetchAllTasks();
            setTasks(updatedTasks);
        }catch(error){
            setPopupText(commonTexts.ERROR_OCCURRED)
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
        filteredTasks,
        scheduleScreenButtons,
        handleDeleteTask,
        popupVisible,
        setPopupVisible,
        popupText,
        handleAddTask,
        selectedDate,
        showDatePicker,
        setShowDatePicker,
        handleDateSelection,
        handleTaskColor,
        handleTaskCompletion
    }
};

export default useHomeScreenViewModel;