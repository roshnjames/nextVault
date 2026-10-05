import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import PopupComponent from "../../components/PopupComponent";
import { noteScreenTexts } from "../../strings/textLoader";
import useAddNoteViewModel from "../../viewmodels/addNote/useAddNoteViewModel";

const AddNoteScreen = ({route}) => {
    const addNoteModel = useAddNoteViewModel({noteId : route?.params});
    
    useFocusEffect(
        useCallback(() => {
            addNoteModel.setHeader(
                addNoteModel.noteEditMode.current
                    ? noteScreenTexts.EDIT_NOTE
                    : noteScreenTexts.NEW_NOTE
                );
        }, [])
    );

    return(
        <View style={addNoteModel.styles.majorContainer}>
            <View style={addNoteModel.styles.mainContainer}>
                <View style={addNoteModel.styles.contentHolder}>
                     <View style={addNoteModel.styles.addNoteNameHolder}>
                        <Text style={addNoteModel.styles.addNoteLabelText}>
                            {addNoteModel.noteScreenTexts.NOTE_TITLE}*
                        </Text>
                        <TextInput
                            style={addNoteModel.styles.textInputBox}
                            // placeholder='Enter task'
                            value={addNoteModel.noteTitle}
                            onChangeText={addNoteModel.setNoteTitle}
                            maxLength={100}
                            multiline
                        />
                    </View>
                     <View style={addNoteModel.styles.addNoteDetailHolder}>
                        <Text style={[addNoteModel.styles.addNoteLabelText,{flex:0.15}]}>
                            {addNoteModel.noteScreenTexts.NOTE_DESC}
                        </Text>
                        <TextInput
                            style={addNoteModel.styles.textDetailInputBox}
                            value={addNoteModel.noteDetails}
                            onChangeText={(text) => {
                                addNoteModel.setNoteDetails(text);
                            }}
                            maxLength={9999}
                            multiline
                        />
                    </View>
                    <TouchableOpacity
                        style={addNoteModel.styles.deleteButtonsStyle}
                        onPress={addNoteModel.handleNoteDeleteById}
                    >
                        <Image
                            source={addNoteModel.scheduleScreenButtons.DELETE_TASK}
                            style={addNoteModel.styles.deleteNoteImage}
                        />
                        <Text style={addNoteModel.styles.deleteNoteTextStyle}>
                            {addNoteModel.noteScreenTexts.NOTE_DELETE}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={addNoteModel.styles.newNoteHolder}>
                    <TouchableOpacity
                        style={addNoteModel.styles.newNoteButton}
                        onPress={() => addNoteModel.handleNewNoteClick()}
                    >
                        <Image
                            source={addNoteModel.scheduleScreenButtons.ADD_TASK}
                            style={addNoteModel.styles.noteAddButonImage}
                        />
                        <Text style={addNoteModel.styles.noteAddButtonText}>
                            {addNoteModel.noteScreenTexts.NOTE_SAVE}
                        </Text>
                    </TouchableOpacity>
                </View>
                {addNoteModel.popupVisible && (
                    <PopupComponent
                        visible={addNoteModel.popupVisible}
                        // buttonCount={2}
                        popupText={addNoteModel.popupText}
                        setClosePopup={addNoteModel.setPopupVisible}
                    />
                )}
            </View>
        </View>
    )
};

export default AddNoteScreen;