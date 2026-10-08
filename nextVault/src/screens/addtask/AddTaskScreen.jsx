import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupComponent from '../../components/PopupComponent';
import useAddTaskViewModel from '../../viewmodels/addTask/useAddTaskViewModel';

const AddTaskScreen = ({ route }) => {
    const addTaskModel = useAddTaskViewModel({ route });

    return (

        <View style={addTaskModel.styles.majorContainer}>
            <View style={addTaskModel.styles.innerContainer}>
                <View style={addTaskModel.styles.contentHolder}>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_NAME}*
                        </Text>
                        <TextInput
                            style={addTaskModel.styles.textInputBox}
                            // placeholder='Enter task'
                            value={addTaskModel.addTaskNewTask}
                            onChangeText={addTaskModel.setAddTaskNewTask}
                            maxLength={50}
                            multiline
                        />
                    </View>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_PRIORITY}*
                        </Text>
                        <View style={addTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={addTaskModel.styles.addTaskPicker}
                                selectedValue={addTaskModel.addTaskPriority}
                                onValueChange={val => addTaskModel.setAddTaskPriority(addTaskModel.addTaskPriorityVals[val - 1].value)}
                            >
                                {addTaskModel.addTaskPriorityVals.map((item, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={[addTaskModel.styles.taskNameHolder, { flex: 0.2 }]}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_DESC}
                        </Text>
                        <TextInput
                            style={[addTaskModel.styles.textInputBox, { textAlignVertical: 'top' }]}
                            // placeholder='Enter details'
                            value={addTaskModel.addTaskNewTaskDetails}
                            onChangeText={addTaskModel.setAddTaskNewTaskDetails}
                            maxLength={150}
                            multiline
                        />
                    </View>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_TIME}
                        </Text>
                        <View style={addTaskModel.styles.dropDownPicker}>
                            <TouchableOpacity 
                            onPress={()=>addTaskModel.setIsShowTimePickerVisible(true)}
                        >
                            <Text style={addTaskModel.styles.addTaskSwitchText}>
                                {addTaskModel.taskTime}
                            </Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_ALERT}
                        </Text>
                        <View style={[addTaskModel.styles.dropDownPicker, { flexDirection: 'row' }]}>
                            <Text style={addTaskModel.styles.addTaskSwitchText}>
                                {`Alarm  ${addTaskModel.addTaskAlertEnabled ? addTaskModel.ON_OFF.ONN : addTaskModel.ON_OFF.OFF}`}
                            </Text>
                            <Switch
                                value={addTaskModel.addTaskAlertEnabled}
                                onValueChange={val => addTaskModel.setAddTaskAlertEnabled(val)}
                                style={[addTaskModel.styles.addTaskPicker, { width: '30%' }]}
                            />
                        </View>
                    </View>
                    <View style={[addTaskModel.styles.taskNameHolder, addTaskModel.addTaskImageCaptured && { flex: 0.35 }]}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_IMAGE}
                        </Text>
                        <View style={[addTaskModel.styles.dropDownPicker, { flexDirection: 'column', gap: '3%' }]}>
                            <TouchableOpacity
                                style={[addTaskModel.styles.addTaskCameraBtn, , addTaskModel.addTaskImageCaptured !== null && { height: '17%' }]}
                                onPress={addTaskModel.addTaskImageSaver}
                            >
                                <Text>
                                    {addTaskModel.addTaskImageCaptured !== null ?
                                        addTaskModel.addTaskScreenTexts.TASK_RECAPTURE :
                                        addTaskModel.addTaskScreenTexts.TASK_IMAGE_CAPTURE
                                    }</Text>
                            </TouchableOpacity>
                            {addTaskModel.addTaskImageCaptured !== null &&
                                <Image
                                    source={{ uri: `file://${addTaskModel.addTaskImageCaptured}` }}
                                    style={addTaskModel.styles.addTaskImageCaptured}
                                />

                            }
                        </View>
                    </View>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_TAG}
                        </Text>
                        <View style={addTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={addTaskModel.styles.addTaskPicker}
                                selectedValue={addTaskModel.addTaskTag}
                                onValueChange={val => addTaskModel.setAddTaskTag(addTaskModel.addTaskPriorityVals[val - 1].value)}
                            >
                                {addTaskModel.addTaskPriorityVals.map((item, index) => (
                                    <Picker.Item
                                        key={index} addTask
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={addTaskModel.styles.addTaskSubmitBtnHolder}>
                    <TouchableOpacity
                        style={addTaskModel.styles.addTaskBtn}
                        onPress={addTaskModel.handleTaskSubmit}>
                        <Text style={addTaskModel.styles.addTaskBtnText}>
                            {addTaskModel.commonTexts.SUBMIT}
                        </Text>
                    </TouchableOpacity>
                </View>
                {addTaskModel.isTimePickerVisible && (
                  <DateTimePicker 
                    value={addTaskModel.getTImePickerValue()}
                    mode="time"
                    display="clock"   
                    onValueChange={addTaskModel.handleTimeUpdation}
                    onDismiss={() => addTaskModel.setIsShowTimePickerVisible(false)}
                  />  
                )}
            </View>
            {addTaskModel.popupVisible && (
                <PopupComponent
                    visible={addTaskModel.popupVisible}
                    // buttonCount={2}
                    popupText={addTaskModel.popupText}
                    setClosePopup={addTaskModel.setPopupVisible}
                />
            )}
        </View>
    )

};

export default AddTaskScreen;