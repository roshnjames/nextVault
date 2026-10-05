import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { TaskContext } from "../../context/taskDetails";
import { deleteNoteById, insertNewNote, updateNoteById } from "../../database/database";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { commonTexts, editTaskScreenTexts, homeScreenTexts, noteScreenTexts } from "../../strings/textLoader";
import addNoteScreenStyles from "../../styles/screens/addNote/addNoteScreen.styles";

const useAddNoteViewModel = (props) =>{
    const {setHeader, setLoading, popupText ,setPopupText, popupVisible, setPopupVisible, notes} = useContext(TaskContext);
    const styles = addNoteScreenStyles();
    const { noteId } =props?.noteId;
    const navigation = useNavigation();

    const [noteTitle, setNoteTitle] = useState('');
    const [noteDetails, setNoteDetails] = useState('');
    const noteEditMode = useRef(false);

    useFocusEffect(
        useCallback(()=>{
            noteEditMode.current = noteId !== -1 ? true : false;

            const fetchNoteData = async() => {
                try{
                    setLoading(true);
                    const noteData = notes?.find(note =>note.note_id === noteId);
                    if(!noteData) throw new Error(commonTexts.DATA_FETCH_FAILED);
                    setNoteTitle(noteData.note_title);
                    setNoteDetails(noteData.note_detail);
                    setLoading(false);
                }catch(error){
                    setLoading(false);
                    Toast.show({
                        type:'error',
                        position:'bottom',
                        text1:commonTexts.DATA_FETCH_FAILED,
                        visibilityTime:1800,
                        avoidKeyboard:true,
                        bottomOffset:180
                    });
                }
            }
            if(noteEditMode.current){
                fetchNoteData();
            };

        },[])
    );

    const handleNewNoteClick = async() => {
        try{
            setLoading(true);
            if(noteEditMode.current){
                const updateRes = await updateNoteById(noteId, noteTitle, noteDetails);
                if(!updateRes) throw new Error(editTaskScreenTexts.UPDATE_FAILED);
                setPopupText(noteScreenTexts.NOTE_UPDATE_SUCCESS);
            }else{
                const insertRes = await insertNewNote(noteTitle, noteDetails);
                if(!insertRes) throw new Error(commonTexts.FAILED);
                setPopupText(noteScreenTexts.NOTE_SAVE_SUCCESS);
            }
        }catch(error){
            console.log('error is',error);
            setPopupText(commonTexts.FAILED);
        }finally{
            setLoading(false);
            setPopupVisible(true);
        }
    };

    const handleNoteDeleteById = async() => {
        try{
            setLoading(true);
            const delRes = await deleteNoteById(noteId);
            if(delRes !== 1) throw new Error(homeScreenTexts.DELETE_FAILED);
            setPopupText(noteScreenTexts.NOTE_DELETE_SUCCESS);
        }catch(error){
            setPopupText(homeScreenTexts.DELETE_FAILED);
        }finally{
            setLoading(false);
            setPopupVisible(true);
        }
    };

    const handleNavigation = () => {
        navigation.navigate('notes');
    };

    return{
        styles,
        setHeader,
        noteScreenTexts,
        noteTitle,
        noteEditMode,
        setNoteTitle,
        noteDetails, 
        setNoteDetails,
        scheduleScreenButtons,
        handleNewNoteClick,
        popupText,
        popupVisible, 
        setPopupVisible,
        handleNoteDeleteById,
        popupText,
        popupVisible,
        setPopupVisible,
        handleNavigation
    }
};

export default useAddNoteViewModel;