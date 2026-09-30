import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import { editTaskScreenTexts } from "../../strings/textLoader";
import useEditTaskViewModel from "../../viewmodels/editTask/useEditTaskViewModel";

const EditTaskScreen = ({route}) => {
    const {taskId} = route.params;
    const editTaskModel = useEditTaskViewModel({taskId:taskId});

    useFocusEffect(
        useCallback(()=>{
            editTaskModel.setHeader(editTaskScreenTexts.EDIT_TASK);
        },[])
    );

    return(
         <View style={editTaskModel.styles.majorContainer}>
            {/* <View style={editTaskModel.styles.innerContainer}>
                <View style={editTaskModel.styles.contentHolder}>
                    <View style={editTaskModel.styles.taskNameHolder}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            'joii'
                        </Text>
                        <TextInput
                            style={editTaskModel.styles.textInputBox}
                            // placeholder='Enter task'
                            value={editTaskModel.addTaskNewTask}
                            onChangeText={editTaskModel.setAddTaskNewTask}
                            maxLength={50}
                            multiline
                        />
                    </View>
                    <View style={editTaskModel.styles.taskNameHolder}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.addTaskScreenTexts.TASK_PRIORITY}*
                        </Text>
                        <View style={editTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={editTaskModel.styles.addTaskPicker}
                                selectedValue={editTaskModel.addTaskPriority}
                                onValueChange={val => editTaskModel.setAddTaskPriority(editTaskModel.addTaskPriorityVals[val - 1].value)}
                            >
                                {editTaskModel.addTaskPriorityVals.map((item, index) => (
                                    <Picker.Item
                                        key={index} addTask
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder, { flex: 0.2 }]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.addTaskScreenTexts.TASK_DESC}
                        </Text>
                        <TextInput
                            style={[editTaskModel.styles.textInputBox, { textAlignVertical: 'top' }]}
                            // placeholder='Enter details'
                            value={editTaskModel.addTaskNewTaskDetails}
                            onChangeText={editTaskModel.setAddTaskNewTaskDetails}
                            maxLength={150}
                            multiline
                        />
                    </View>
                    <View style={editTaskModel.styles.taskNameHolder}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.addTaskScreenTexts.TASK_ALERT}
                        </Text>
                        <View style={[editTaskModel.styles.dropDownPicker, { flexDirection: 'row' }]}>
                            <Text style={editTaskModel.styles.addTaskSwitchText}>
                                {`Alarm  ${editTaskModel.addTaskAlertEnabled ? editTaskModel.ON_OFF.ONN : editTaskModel.ON_OFF.OFF}`}
                            </Text>
                            <Switch
                                value={editTaskModel.addTaskAlertEnabled}
                                onValueChange={val => editTaskModel.setAddTaskAlertEnabled(val)}
                                style={[editTaskModel.styles.addTaskPicker, { width: '30%' }]}
                            />
                        </View>
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder, editTaskModel.addTaskImageCaptured && { flex: 0.35 }]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.addTaskScreenTexts.TASK_IMAGE}
                        </Text>
                        <View style={[editTaskModel.styles.dropDownPicker, { flexDirection: 'column', gap: '3%' }]}>
                            <TouchableOpacity
                                style={[editTaskModel.styles.addTaskCameraBtn, , editTaskModel.addTaskImageCaptured !== null && { height: '17%' }]}
                                onPress={editTaskModel.addTaskImageSaver}
                            >
                                <Text>
                                    {editTaskModel.addTaskImageCaptured !== null ?
                                        editTaskModel.addTaskScreenTexts.TASK_RECAPTURE :
                                        editTaskModel.addTaskScreenTexts.TASK_IMAGE_CAPTURE
                                    }</Text>
                            </TouchableOpacity>
                            {editTaskModel.addTaskImageCaptured !== null &&
                                <Image
                                    source={{ uri: `file://${editTaskModel.addTaskImageCaptured}` }}
                                    style={editTaskModel.styles.addTaskImageCaptured}
                                />

                            }
                        </View>
                    </View>
                    <View style={editTaskModel.styles.taskNameHolder}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.addTaskScreenTexts.TASK_TAG}
                        </Text>
                        <View style={editTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={editTaskModel.styles.addTaskPicker}
                                selectedValue={editTaskModel.addTaskTag}
                                onValueChange={val => editTaskModel.setAddTaskTag(editTaskModel.addTaskPriorityVals[val - 1].value)}
                            >
                                {editTaskModel.addTaskPriorityVals.map((item, index) => (
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
                <View style={editTaskModel.styles.addTaskSubmitBtnHolder}>
                    <TouchableOpacity
                        style={editTaskModel.styles.addTaskBtn}
                        onPress={editTaskModel.handleTaskSubmit}>
                        <Text style={editTaskModel.styles.addTaskBtnText}>
                            {editTaskModel.commonTexts.SUBMIT}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {editTaskModel.popupVisible && (
                <PopupComponent
                    visible={editTaskModel.popupVisible}
                    // buttonCount={2}
                    popupText={editTaskModel.popupText}
                    setClosePopup={editTaskModel.setPopupVisible}
                />
            )} */}
        </View>
    );
};

export default EditTaskScreen;