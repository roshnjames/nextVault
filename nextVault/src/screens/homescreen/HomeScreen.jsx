import { Text, View } from "react-native";
import homeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";

const HomeScreen = () => {
    const styles = homeScreenStyles();
    return(
        <View style={styles.majorContainer}>
            <Text>
                homescreen rendered
            </Text>
        </View>
    );
};

export default HomeScreen;