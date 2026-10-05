import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import Toast from "react-native-toast-message";
import { TaskContext } from "../../context/taskDetails";
import { fetchAllNotes } from "../../database/database";
import { scheduleScreenButtons } from "../../images/imageLoader";
import { commonTexts, noteScreenTexts } from "../../strings/textLoader";
import noteScreenStyles from "../../styles/screens/notes/noteScreen.styles";
    
const useNoteViewModel = () => {
    const {setHeader, setLoading, popupText ,setPopupText, popupVisible, setPopupVisible, notes, setNotes} = useContext(TaskContext);
    const styles = noteScreenStyles();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(()=>{
            const fetchNotes = async() => {
                try{
                    setLoading(true);
                    const fetchedNotes = await fetchAllNotes();
                    setNotes(fetchedNotes);
                    setLoading(false);
                }catch(error){
                    setLoading(false);
                    Toast.show({
                        type:'error',
                        position:'bottom',
                        text1:commonTexts.ERROR_OCCURRED,
                        visibilityTime:1800,
                        avoidKeyboard:true,
                        bottomOffset:180
                        
                    });
                }
            };

            fetchNotes();
        },[])
    );

    const handleNoteClick = (noteId = -1) => {
        navigation.navigate('addNote',{noteId});
    };

    return{
        noteScreenTexts,
        setHeader,
        styles,
        popupText,
        popupVisible,
        setPopupVisible,
        scheduleScreenButtons,
        handleNoteClick,
        notes, 
        setNotes,
    };
};

export default useNoteViewModel;