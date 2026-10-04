import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { TaskContext } from "../../context/taskDetails";
import { deleteTaskByDate, fetchAllTasks, fetchTaskByDate } from "../../database/database";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { commonTexts, homeScreenTexts, scheduleScreenTexts } from "../../strings/textLoader";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const useScheduleViewModel = () => {
    const { height, width } = useWindowDimensions();
    const styles = scheduleScreenStyles(height, width);
    const navigation = useNavigation();
    const { setHeader, setLoading, popupText, setPopupText, popupVisible, setPopupVisible, setTasks } = useContext(TaskContext);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [totalTasks, setTotalTasks] = useState(0);


    useFocusEffect(
        useCallback(()=>{
            setHeader(scheduleScreenTexts.HEADING);
        },[])
    );

    useEffect(()=>{
        const fetchTasks = async () => {
            if(!selectedDate) return;
            try {
                setLoading(true);
                const tasks = await fetchTaskByDate(selectedDate);
                setTotalTasks(tasks?.length);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: commonTexts.DATA_FETCH_FAILED,
                    visibilityTime: 1800,
                    avoidKeyboard: true,
                    bottomOffset: 180
                });
            }
        };
        fetchTasks();
    },[selectedDate])

    const checkSelectedDate = (dt) => {
        if (selectedDate === dt.dateString) {
            setSelectedDate(null);
        } else {
            setSelectedDate(dt.dateString);
        }
    };

    const handleAddTaskPress = () => {
        navigation.navigate('addTask', {
            date: selectedDate
        })
    };

    const handleTaskDeleteByDate = async() => {
         try{
            setLoading(true);
            const delRes = await deleteTaskByDate(selectedDate);
            if(delRes !== totalTasks) throw new Error(commonTexts.FAILED);
            const updatedTasks = await fetchAllTasks();
            setTasks(updatedTasks);
            setPopupText(homeScreenTexts.DELETE_SUCCESS);
        }catch(error){
            setPopupText(homeScreenTexts.DELETE_FAILED);
        }finally{
            setLoading(false);
            setPopupVisible(true);
        }
    };

    return {
        styles,
        selectedDate,
        setSelectedDate,
        checkSelectedDate,
        scheduleScreenTexts,
        scheduleScreenButtons,
        handleAddTaskPress,
        handleTaskDeleteByDate,
        totalTasks,
        popupText, 
        popupVisible, 
        setPopupVisible
    };

};

export default useScheduleViewModel;