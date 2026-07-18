import { Picker } from '@react-native-picker/picker';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useAddTaskViewModel from '../../../viewmodels/addTask/useAddTaskViewModel';

const AddTaskScreen = ({ route }) => {
    const addTaskModel = useAddTaskViewModel({ route });

    return (
        <View style={addTaskModel.styles.majorContainer}>
            <View style={addTaskModel.styles.innerContainer}>
                <View style={addTaskModel.styles.contentHolder}>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_NAME}
                        </Text>
                        <TextInput
                            style={addTaskModel.styles.textInputBox}
                            // placeholder='Enter task'
                            onChangeText={name => addTaskModel.addTaskNewTask.current = name}
                            maxLength={50}
                            multiline
                        />
                    </View>
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_PRIORITY}
                        </Text>
                        <View style={addTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={addTaskModel.styles.addTaskPicker}
                                selectedValue={addTaskModel.addTaskPriority}
                                onValueChange={val => addTaskModel.setAddTaskPriority(addTaskModel.addTaskPriorityVals[val - 1])}
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
                    <View style={[addTaskModel.styles.taskNameHolder, { flex: 0.2 }]}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_DESC}
                        </Text>
                        <TextInput
                            style={[addTaskModel.styles.textInputBox, { textAlignVertical: 'top' }]}
                            // placeholder='Enter details'
                            onChangeText={details => addTaskModel.addTaskNewTaskDetails.current = details}
                            maxLength={150}
                            multiline
                        />
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
                    <View style={addTaskModel.styles.taskNameHolder}>
                        <Text style={addTaskModel.styles.addTaskLabelText}>
                            {addTaskModel.addTaskScreenTexts.TASK_IMAGE}
                        </Text>
                        <View style={[addTaskModel.styles.dropDownPicker, { flexDirection: 'row' }]}>
                            {addTaskModel.addTaskImageCaptured === null && <Text style={addTaskModel.styles.addTaskSwitchText}>
                                {`Alarm  ${addTaskModel.addTaskAlertEnabled ? addTaskModel.ON_OFF.ONN : addTaskModel.ON_OFF.OFF}`}
                            </Text>
                            }
                            <TouchableOpacity
                                style={addTaskModel.styles.addTaskCameraBtn}
                                onPress={addTaskModel.addTaskImageSaver}
                            >
                                <Text>{addTaskModel.addTaskScreenTexts.TASK_IMAGE_CAPTURE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={addTaskModel.styles.addTaskScreenTextStyle}>
                        date{addTaskModel.date}
                    </Text>
                </View>
            </View>

        </View>
    )

};

export default AddTaskScreen;