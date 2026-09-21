import { useEffect } from "react";
import { Text, View } from "react-native";
import { fetchAllData } from "../../database/database";
import homeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";

const HomeScreen = () => {
    const styles = homeScreenStyles();

    useEffect(()=>{
        fetchAllData('next_tasks');
    },[])
    return(
        <View style={styles.majorContainer}>
            <Text>
                homescreen rendered
            </Text>
        </View>
    );
};

export default HomeScreen;