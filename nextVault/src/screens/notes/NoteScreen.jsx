import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useNoteViewModel from "../../viewmodels/notes/useNoteViewModel";
import PopupComponent from '../../components/PopupComponent';

const NoteScreen = () => {
    const noteModel = useNoteViewModel();

    useFocusEffect(
        useCallback(()=>{
            noteModel.setHeader(noteModel.noteScreenTexts.HEADER);
        },[])
    );

    return(
        <View style={noteModel.styles.majorContainer}>
            <View style={noteModel.styles.mainContainer}>
                <View style={noteModel.styles.topBarContainer}>
                    <Text>
                    Notescreen rendered
                    </Text>
                    <Text>
                    rendered
                    </Text>
                </View>
                 <View style={noteModel.styles.notesListContainer}>
                    <ScrollView 
                        contentContainerStyle={noteModel.styles.notesList}
                        showsVerticalScrollIndicator={true}
                    >
                        <TouchableOpacity 
                            style={noteModel.styles.noteItemContainer}
                            onPress={()=>noteModel.handleNoteClick(1)}
                        >
                            <View style={noteModel.styles.noteItemIndexContainer}>
                                <Text style={noteModel.styles.noteItemIndexText}>
                                18
                                </Text>
                            </View>
                            <View style={noteModel.styles.noteItemContentContainer}>
                                <View style={noteModel.styles.noteItemContentHeader}>
                                    <Text style={noteModel.styles.noteItemContentHeaderText}>
                                    Notescreen rendered
                                    </Text>
                                </View>
                                <View style={noteModel.styles.noteItemContentItem}>
                                    <Text style={noteModel.styles.noteItemContentItemText}>
                                Notescreen rendered
                                </Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity 
                        style={noteModel.styles.newNoteHolder}
                        onPress={()=>noteModel.handleNoteClick()}
                    >
                        <Image 
                            source={noteModel.scheduleScreenButtons.ADD_TASK}
                            style={noteModel.styles.noteAddButonImage}
                        />
                        <Text style={noteModel.styles.noteAddButtonText}>
                            {noteModel.noteScreenTexts.NEW_NOTE}
                        </Text>
                    </TouchableOpacity>
                </View>
                {noteModel.popupVisible && (
                    <PopupComponent 
                        visible={noteModel.popupVisible}
                        popupText={noteModel.popupText}
                        setClosePopup={noteModel.setPopupVisible}
                    />
                )}
            </View>
        </View>
    );
};

export default NoteScreen;