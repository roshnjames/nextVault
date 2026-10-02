import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import PopupComponent from "../../components/PopupComponent";
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
             <View style={editTaskModel.styles.innerContainer}>
                <View style={editTaskModel.styles.contentHolder}>
                    <View style={[editTaskModel.styles.taskNameHolder,{flex:0.1}]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_NAME}*
                        </Text>
                        <TextInput
                            style={editTaskModel.styles.textInputBox}
                            // placeholder='Enter task'
                            value={editTaskModel.t_name}
                            onChangeText={editTaskModel.setT_name}
                            maxLength={50}
                            multiline
                        />
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder,{flex:0.1}]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_DATE}*
                        </Text>
                        <TextInput
                            style={editTaskModel.styles.textInputBox}
                            // placeholder='Enter task'
                            value={editTaskModel.t_name}
                            onChangeText={editTaskModel.setT_name}
                            maxLength={50}
                            multiline
                        />
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder,{flex:0.1}]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_PRIORITY}*
                        </Text>
                        <View style={editTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={editTaskModel.styles.addTaskPicker}
                                selectedValue={editTaskModel.t_priority}
                                onValueChange={val => editTaskModel.setT_priority(editTaskModel.addTaskPriorityVals[val - 1].value)}
                            >
                                {editTaskModel.addTaskPriorityVals.map((item, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder, { flex: 0.2 }]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_DESC}
                        </Text>
                        <TextInput
                            style={[editTaskModel.styles.textInputBox, { textAlignVertical: 'top' }]}
                            // placeholder='Enter details'
                            value={editTaskModel.t_details}
                            onChangeText={editTaskModel.setT_details}
                            maxLength={150}
                            multiline
                        />
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder,{flex:0.1}]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_ALERT}
                        </Text>
                        <View style={[editTaskModel.styles.dropDownPicker, { flexDirection: 'row' }]}>
                            <Text style={editTaskModel.styles.addTaskSwitchText}>
                                {`Alarm  ${editTaskModel.t_alarm ? editTaskModel.ON_OFF.ONN : editTaskModel.ON_OFF.OFF}`}
                            </Text>
                            <Switch
                                value={editTaskModel.t_alarm === 1}
                                onValueChange={val => editTaskModel.setT_alarm(val)}
                                style={[editTaskModel.styles.addTaskPicker, { width: '30%' }]}
                            />
                        </View>
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder, editTaskModel.t_picture && { flex: 0.31 }]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_IMAGE}
                        </Text>
                        <View style={[editTaskModel.styles.dropDownPicker, { flexDirection: 'column', gap: '3%' }]}>
                            <TouchableOpacity
                                style={[editTaskModel.styles.addTaskCameraBtn, editTaskModel.t_picture !== null && { height: '20%' }]}
                                onPress={editTaskModel.editTaskImageSaver}
                            >
                                <Text>
                                    {editTaskModel.editTaskImageCaptured !== null ?
                                        editTaskModel.editTaskScreenTexts.TASK_RECAPTURE :
                                        editTaskModel.editTaskScreenTexts.TASK_IMAGE_CAPTURE
                                    }</Text>
                            </TouchableOpacity>
                            {editTaskModel.t_picture !== null &&
                                <Image
                                    source={{ uri: `file://${editTaskModel.t_picture}` }}
                                    style={editTaskModel.styles.addTaskImageCaptured}
                                />

                            }
                        </View>
                    </View>
                    <View style={[editTaskModel.styles.taskNameHolder,{flex:0.1}]}>
                        <Text style={editTaskModel.styles.addTaskLabelText}>
                            {editTaskModel.editTaskScreenTexts.TASK_TAG}
                        </Text>
                        <View style={editTaskModel.styles.dropDownPicker}>
                            <Picker
                                style={editTaskModel.styles.addTaskPicker}
                                selectedValue={editTaskModel.t_tag}
                                onValueChange={val => editTaskModel.setT_tag(editTaskModel.addTaskPriorityVals[val - 1].value)}
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
                        onPress={editTaskModel.handleTaskUpdate}>
                        <Text style={editTaskModel.styles.addTaskBtnText}>
                            {editTaskModel.commonTexts.UPDATE}
                        </Text>
                    </TouchableOpacity>
                </View>
                 {editTaskModel.popupVisible && (
                <PopupComponent
                    visible={editTaskModel.popupVisible}
                    // buttonCount={2}
                    popupText={editTaskModel.popupText}
                    setClosePopup={editTaskModel.setPopupVisible}
                />
            )} 
            </View> 
        </View>
    );
};

export default EditTaskScreen;