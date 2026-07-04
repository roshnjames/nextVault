import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const ScheduleScreen = () => {
    const { height } = useWindowDimensions();
    const [selectedDate, setSelectedDate] = useState('');
    const styles = scheduleScreenStyles(height);
    return (
        <View style={styles.majorContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>
                        Schedule tasks here!
                    </Text>
                </View>
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString)
                        }}
                        theme={styles.calendarTheme}
                        markedDates={{
                            [selectedDate]: styles.markedDate
                        }} />
                </View>
            </View>

        </View>
    );
}

export default ScheduleScreen;