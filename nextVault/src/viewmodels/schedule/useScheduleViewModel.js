import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { useWindowDimensions } from "react-native";
import { TaskContext } from "../../context/taskDetails";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { scheduleScreenTexts } from "../../strings/textLoader";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const useScheduleViewModel = () => {
    const { height, width } = useWindowDimensions();
    const styles = scheduleScreenStyles(height, width);
    const navigation = useNavigation();
    const { setHeader } = useContext(TaskContext);
    const [selectedDate, setSelectedDate] = useState(null);


    useFocusEffect(
        useCallback(()=>{
            setHeader(scheduleScreenTexts.HEADING);
        },[])
    );

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
        handleAddTaskPress
    };

};

export default useScheduleViewModel;