import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";
import useNoteViewModel from "../../viewmodels/notes/useNoteViewModel";

const NoteScreen = () => {
    const noteModel = useNoteViewModel();

    useFocusEffect(
        useCallback(()=>{
            noteModel.setHeader(noteModel.noteScreenTexts.HEADER);
        },[])
    );

    return(
        <View>
            <View>
                <Text>
                    Notescreen rendered
                </Text>
            </View>
        </View>
    );
};

export default NoteScreen;