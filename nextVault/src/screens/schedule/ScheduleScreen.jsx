import { Text, View } from "react-native";
import scheduleScreenStyles from "../../styles/screens/schedule/scheduleScreen.styles";

const ScheduleScreen = () => {
    const styles = scheduleScreenStyles();
    return(
        <View style={styles.majorContainer}>
            <Text>
                ScheduleScreen rendered
            </Text>
        </View>
    );
}

export default ScheduleScreen;