import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { TaskContext } from "../../context/taskDetails";
import { fetchTaskByDate } from "../../database/database";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { commonTexts, scheduleScreenTexts } from "../../strings/textLoader";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const useScheduleViewModel = () => {
    const { height, width } = useWindowDimensions();
    const styles = scheduleScreenStyles(height, width);
    const navigation = useNavigation();
    const { setHeader } = useContext(TaskContext);
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
                const tasks = await fetchTaskByDate(selectedDate);
                setTotalTasks(tasks?.length);
            } catch (error) {
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

    return {
        styles,
        selectedDate,
        setSelectedDate,
        checkSelectedDate,
        scheduleScreenTexts,
        scheduleScreenButtons,
        handleAddTaskPress,
        totalTasks
    };

};

export default useScheduleViewModel;