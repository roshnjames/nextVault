import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { scheduleScreenTexts } from "../../strings/textLoader";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const useScheduleViewModel = () => {
    const { height, width } = useWindowDimensions();
    const styles = scheduleScreenStyles(height, width);
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);


    const checkSelectedDate = (dt) => {
        if (selectedDate === dt.dateString) {
            setSelectedDate(null);
        } else {
            setSelectedDate(dt.dateString);
        }
    };

    return {
        styles,
        navigation,
        selectedDate,
        setSelectedDate,
        checkSelectedDate,
        scheduleScreenTexts,
        scheduleScreenButtons
    };

};

export default useScheduleViewModel;