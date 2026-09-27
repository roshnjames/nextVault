import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useHomeScreenViewModel from "../../viewmodels/homeScreen/useHomeScreenViewModel";

const HomeScreen = () => {
    const homeScreenModel = useHomeScreenViewModel();

    useFocusEffect( 
        useCallback(()=>{
            homeScreenModel.setHeader(homeScreenModel.homeScreenTexts.YOUR_TASKS);
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
                <View style={homeScreenModel.styles.tasksContainer}>
                    <ScrollView
                        contentContainerStyle={homeScreenModel.styles.tasksList}
                        showsVerticalScrollIndicator={true}
                    >
                        {homeScreenModel.tasks?.map((task, index) => {
                            return(
                                <View style={homeScreenModel.styles.taskItemContainer} key={index}>
                                    <View style={homeScreenModel.styles.taskItemContent}>
                                        <View style={homeScreenModel.styles.taskItemNameContainer}>
                                            <View style={homeScreenModel.styles.taskItemIndexContainer}>
                                                <Text style={homeScreenModel.styles.taskItemIndexText}>
                                                    {index+1}
                                                </Text>
                                            </View>
                                            <View style={homeScreenModel.styles.taskItemNameMainContainer}>
                                                <Text style={homeScreenModel.styles.taskItemNameText}>
                                                    {task.task_name}
                                                </Text>
                                            </View>
                                            <View style={homeScreenModel.styles.taskItemAlarmContainer}>
                                                <Image 
                                                source={task.task_alert === 1 
                                                    ? homeScreenModel.scheduleScreenButtons.ALARM_ON 
                                                    : homeScreenModel.scheduleScreenButtons.ALARM_OFF
                                                }
                                                style={homeScreenModel.styles.taskItemAlarmImage}
                                                />
                                            </View>
                                        </View>
                                        <View style={homeScreenModel.styles.taskItemDetailsContainer}>
                                            <View style={[homeScreenModel.styles.taskItemDetailsMainContainer,task?.task_image === null && {width:'100%'}]}>
                                                <Text style={homeScreenModel.styles.taskItemDetailsText}>
                                                    {task.task_details}
                                                </Text>
                                            </View>
                                            {task?.task_image && <Image
                                                source={{ uri: `file://${task?.task_image}` }}
                                                style={homeScreenModel.styles.taskItemImage}
                                            />
                                            }
                                        </View>
                                    </View>
                                    <View style={homeScreenModel.styles.taskItemButtonsContainer}>

                                        <TouchableOpacity 
                                        style={homeScreenModel.styles.taskItemButton}
                                        >
                                            <Image
                                                source={homeScreenModel?.scheduleScreenButtons?.DELETE_TASK}
                                                style={homeScreenModel.styles.taskItemButtonImage}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                        style={homeScreenModel.styles.taskItemButton}
                                        >
                                            <Image
                                                source={homeScreenModel?.scheduleScreenButtons?.EDIT_TASK}
                                                style={homeScreenModel.styles.taskItemButtonImage}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                        style={homeScreenModel.styles.taskItemButton}
                                        >
                                            <Image
                                                source={homeScreenModel?.scheduleScreenButtons?.DONE_TASK}
                                                style={homeScreenModel.styles.taskItemButtonImage}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
