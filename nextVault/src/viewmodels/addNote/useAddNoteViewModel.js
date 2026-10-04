import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { TaskContext } from "../../context/taskDetails";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { commonTexts, noteScreenTexts } from "../../strings/textLoader";
import addNoteScreenStyles from "../../styles/screens/addNote/addNoteScreen.styles";
import { insertNewNote } from "../../database/database";

const useAddNoteViewModel = (props) =>{
    const {setHeader, setLoading, popupText ,setPopupText, popupVisible, setPopupVisible} = useContext(TaskContext);
    const styles = addNoteScreenStyles();
    const { noteId } =props?.noteId;

    const [noteTitle, setNoteTitle] = useState('');
    const [noteDetails, setNoteDetails] = useState('');

    useFocusEffect(
        useCallback(()=>{
            console.log('arg reccieved in addnote viewmodel :',noteId);
        },[])
    );

    const handleNewNoteClick = async() => {
        try{
            setLoading(true);
            const insertRes = await insertNewNote(noteTitle, noteDetails);
            if(!insertRes) throw new Error(commonTexts.FAILED);
            setPopupText(noteScreenTexts.NOTE_SAVE_SUCCESS);
        }catch(error){
            setPopupText(commonTexts.FAILED);
        }finally{
            setLoading(false);
            setPopupVisible(true);
        }
    };

    return{
        styles,
        setHeader,
        noteScreenTexts,
        noteTitle, 
        setNoteTitle,
        noteDetails, 
        setNoteDetails,
        scheduleScreenButtons,
        handleNewNoteClick,
        popupText,
        popupVisible, 
        setPopupVisible
    }
};

export default useAddNoteViewModel;