import { Image, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { scheduleScreenTexts } from "../../strings/textLoader";
import useScheduleViewModel from "../../viewmodels/schedule/useScheduleViewModel";

const ScheduleScreen = () => {

    const scheduleModel = useScheduleViewModel();
    return (
        <View style={scheduleModel.styles.majorContainer}>
            <View style={scheduleModel.styles.innerContainer}>
                <View style={scheduleModel.styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) =>
                            scheduleModel.checkSelectedDate(day)
                        }
                        theme={scheduleModel.styles.calendarTheme}
                        markedDates={{
                            [scheduleModel.selectedDate]: scheduleModel.styles.markedDate
                        }} />
                </View>
                <View style={scheduleModel.styles.bottomSectionContainer}>
                    {scheduleModel.selectedDate && (
                        <View style={scheduleModel.styles.displayDayDetailsContainer}>
                            <View style={scheduleModel.styles.displayDayDetailDateContainer}>
                                <Text style={scheduleModel.styles.dayDetailsDateText}>
                                    {new Date(scheduleModel.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit',
                                    })}
                                </Text>
                            </View>
                            <View style={scheduleModel.styles.displayDayDetailTasksContainer}>
                                <Text style={scheduleModel.styles.dayDetailsTasksText}>
                                    {scheduleScreenTexts.DAY_TASKS(scheduleModel.totalTasks)}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View style={scheduleModel.styles.addTaskContainer}>
                        <TouchableOpacity
                            disabled={scheduleModel.selectedDate === null}
                            style={scheduleModel.styles.addTaskButtonStyles}
                            onPress={() => scheduleModel.handleAddTaskPress()}
                        >
                            {scheduleModel.selectedDate && <Image
                                source={scheduleModel.scheduleScreenButtons.ADD_TASK}
                                style={scheduleModel.styles.addTaskImageStyle}
                            />}
                            <Text style={[scheduleModel.styles.addTaskButtonTextStyle, scheduleModel.selectedDate === null && { color: '#bc8b2fff' }]}>
                                {scheduleModel.selectedDate === null ? scheduleModel.scheduleScreenTexts.SELECT_DATE : scheduleModel.scheduleScreenTexts.ADD_TASK}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {scheduleModel.selectedDate && <View style={scheduleModel.styles.bottomSectionLowerContainer}>
                        {scheduleModel.totalTasks > 0 && (<TouchableOpacity style={scheduleModel.styles.lowerButtonsStyle}>
                            <Image
                                source={scheduleModel.scheduleScreenButtons.DELETE_TASK}
                                style={scheduleModel.styles.bottomSectionLowerIconStyles}
                            />
                            <Text style={scheduleModel.styles.lowerButtonTextStyle}>
                                {scheduleModel.scheduleScreenTexts.DELETE_TASK(scheduleModel.totalTasks)}
                            </Text>
                        </TouchableOpacity>
                        )}
                        <TouchableOpacity style={scheduleModel.styles.lowerButtonsStyle}>
                            <Image
                                source={scheduleModel.scheduleScreenButtons.EDIT_TASK}
                                style={scheduleModel.styles.bottomSectionLowerIconStyles}
                            />
                            <Text style={scheduleModel.styles.lowerButtonTextStyle}>
                                {scheduleModel.scheduleScreenTexts.EDIT_TASK}
                            </Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        </View>
    );
}

export default ScheduleScreen;