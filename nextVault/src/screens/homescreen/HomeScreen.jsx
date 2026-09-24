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

    return (
        <View style={homeScreenModel.styles.majorContainer}>
            <View style={homeScreenModel.styles.mainContainer}>
                <View style={homeScreenModel.styles.filterContainer}>
                    <Text style={homeScreenModel.styles.filterText}>
                        Filter Tasks
                    </Text>
                    <View style={homeScreenModel.styles.filterButtonContainer}>
                        <Text style={homeScreenModel.styles.filterText}>
                            Filter Tasks
                        </Text>
                    </View>
                </View>
                <View style={homeScreenModel.styles.tasksCOntainer}>
                    <Text>
                        homescreen rendered
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
