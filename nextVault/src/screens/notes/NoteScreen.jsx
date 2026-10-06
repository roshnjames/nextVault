import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import PopupComponent from '../../components/PopupComponent';
import useNoteViewModel from "../../viewmodels/notes/useNoteViewModel";

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
                    <View style={noteModel.styles.searchTextHolder}>
                        {noteModel.searchEnable && (
                            <View style={noteModel.styles.searchInputHolder}>
                                <TextInput 
                                  value={noteModel.searchText}
                                  onChangeText={noteModel.setSearchText}
                                  autoFocus={true}
                                  textAlign="left"
                                  placeholder="Search notes..."
                                  placeholderTextColor="gray"
                                  style={noteModel.styles.searchInputText}
                                />
                            </View>
                        )}
                    </View>
                    <View style={noteModel.styles.searchButtonHolder}>
                        <TouchableOpacity
                            onPress={()=>{
                                noteModel.setSearchEnable(curr => !curr)
                            }}
                        >
                            <Image
                                style={noteModel.styles.searchIconImage}
                                source={noteModel.scheduleScreenButtons.SEARCH_ICON} />
                        </TouchableOpacity>
                    </View>
                </View>
                 <View style={noteModel.styles.notesListContainer}>
                        <ScrollView
                            contentContainerStyle={noteModel.styles.notesList}
                            showsVerticalScrollIndicator={true}
                        >
                            {noteModel?.filteredNotes?.length > 0 && noteModel?.filteredNotes?.map((note, index) => {
                                return (
                                    <TouchableOpacity
                                        style={noteModel.styles.noteItemContainer}
                                        onPress={() => noteModel.handleNoteClick(note?.note_id)}
                                        key={index}
                                    >
                                        <View style={noteModel.styles.noteItemIndexContainer}>
                                            <Text style={noteModel.styles.noteItemIndexText}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <View style={noteModel.styles.noteItemContentContainer}>
                                            <View style={noteModel.styles.noteItemContentHeader}>
                                                <Text style={noteModel.styles.noteItemContentHeaderText}>
                                                    {note?.note_title}
                                                </Text>
                                            </View>
                                            <View style={noteModel.styles.noteItemContentItem}>
                                                <Text style={noteModel.styles.noteItemContentItemText}>
                                                    {note?.note_detail}
                                                </Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
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