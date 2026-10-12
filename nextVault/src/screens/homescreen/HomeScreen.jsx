import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PopupComponent from "../../components/PopupComponent";
import useHomeScreenViewModel from "../../viewmodels/homeScreen/useHomeScreenViewModel";


const HomeScreen = () => {
    const homeScreenModel = useHomeScreenViewModel();

    useFocusEffect( 
        useCallback(()=>{
            homeScreenModel.setHeader(homeScreenModel.homeScreenTexts.YOUR_TASKS);
        },[])
    );

    const addTaskButton = () => {
        return(
            <View style={homeScreenModel.styles.noTaskContainer}>
                <TouchableOpacity 
                    style={homeScreenModel.styles.taskAddButton}
                    onPress={homeScreenModel.handleAddTask}
                >
                    <Image
                        source={homeScreenModel.scheduleScreenButtons.ADD_TASK}
                        style={homeScreenModel.styles.addtaskItemImage}
                    />
                    <Text style={homeScreenModel.styles.addTaskText}>
                        {homeScreenModel.scheduleScreenTexts.ADD_TASK}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={homeScreenModel.styles.majorContainer}>
            <View style={homeScreenModel.styles.mainContainer}>
                {homeScreenModel.tasks?.length === 0 && 
                    addTaskButton()
                }
                {homeScreenModel.tasks?.length > 0 && <>
                <View style={homeScreenModel.styles.filterContainer}>
                    {homeScreenModel.pendingTasks && (
                        <View style={[homeScreenModel.styles.filterButtonContainer,{flex: 0.4,backgroundColor:'rgb(230, 112, 94)'}]}>
                        <TouchableOpacity 
                            style={homeScreenModel.styles.filterButton}
                            onPress={()=>homeScreenModel.handlePendingTasksPress()}
                        >
                            <Text style={homeScreenModel.styles.filterDateText}>
                                {homeScreenModel.homeScreenTexts.PENDING_TASKS}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    <Text style={homeScreenModel.styles.filterText}>
                        {homeScreenModel.homeScreenTexts.SELECT_DATE}
                    </Text>
                    <View style={homeScreenModel.styles.filterButtonContainer}>
                        <TouchableOpacity 
                            style={homeScreenModel.styles.filterButton}
                            onPress={()=>homeScreenModel.setShowDatePicker(true)}
                        >
                            <Text style={homeScreenModel.styles.filterDateText}>
                                {homeScreenModel.selectedDate}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={homeScreenModel.styles.tasksContainer}>
                    {homeScreenModel.filteredTasks.length > 0 ?
                        <ScrollView
                            contentContainerStyle={homeScreenModel.styles.tasksList}
                            showsVerticalScrollIndicator={true}
                        >
                            {homeScreenModel.filteredTasks?.map((task, index) => {
                                return(
                                    <View 
                                        style={[
                                                homeScreenModel.styles.taskItemContainer,
                                                {backgroundColor:homeScreenModel.handleTaskColor(task?.task_priority,task?.task_is_completed)}
                                            ]
                                            } key={index}>
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
                                            onPress={()=>homeScreenModel.handleDeleteTask(task?.task_id)}
                                            >
                                                <Image
                                                    source={homeScreenModel?.scheduleScreenButtons?.DELETE_TASK}
                                                    style={homeScreenModel.styles.taskItemButtonImage}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity 
                                            style={homeScreenModel.styles.taskItemButton}
                                            onPress={()=>homeScreenModel.handleEditTask(task?.task_id)}
                                            >
                                                <Image
                                                    source={homeScreenModel?.scheduleScreenButtons?.EDIT_TASK}
                                                    style={homeScreenModel.styles.taskItemButtonImage}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                            style={homeScreenModel.styles.taskItemButton}
                                            onPress={()=>homeScreenModel.handleTaskCompletion(task?.task_id)}
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
                    :addTaskButton()
                    }
                </View>
                {homeScreenModel.showDatePicker && (
                    <DateTimePicker
                        value={new Date(homeScreenModel.selectedDate)}
                        mode="date"
                        display="spinner"
                        onValueChange={homeScreenModel.handleDateSelection}
                        onDismiss={()=>homeScreenModel.setShowDatePicker(false)}
                    />
                )}
                </>
                }
            </View>
            {homeScreenModel.popupVisible && (
                <PopupComponent 
                    visible={homeScreenModel.popupVisible}
                    popupText={homeScreenModel.popupText}
                    setClosePopup={homeScreenModel.setPopupVisible}
                />
            )}
        </View>
    );
};

export default HomeScreen;
