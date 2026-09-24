import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";
import { fetchAllData } from "../../database/database";
import useHomeScreenViewModel from "../../viewmodels/homeScreen/useHomeScreenViewModel";

const HomeScreen = () => {
    const homeScreenModel = useHomeScreenViewModel();

    useFocusEffect( 
        useCallback(()=>{
            homeScreenModel.setHeader(homeScreenModel.homeScreenTexts.YOUR_TASKS);
            fetchAllData('next_tasks');
        },[])
    );

    return(
        <View style={homeScreenModel.styles.majorContainer}>
            <View style={homeScreenModel.styles.mainContainer}>
                <Text>
                    homescreen rendered
                </Text>
            </View>
        </View>
    );
};

export default HomeScreen;