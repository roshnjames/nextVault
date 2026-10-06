import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
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
    const [searchEnable, setSearchEnable] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    useFocusEffect(
        useCallback(()=>{
            const fetchNotes = async() => {
                try{
                    setLoading(true);
                    const fetchedNotes = await fetchAllNotes();
                    setNotes(fetchedNotes);
                    setFilteredNotes(fetchedNotes);
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

    useEffect(() => {
        try {
            if(searchText === ''){
                setFilteredNotes(notes)
                return;
            }

            if(searchText !=='' && !searchEnable){
                setFilteredNotes(notes)
                setSearchText('');
                return;
            }

            setLoading(true);
            const filtered = notes.filter(note => {
                return (
                    note?.note_title?.toLowerCase().includes(searchText.toLowerCase())
                    || note?.note_detail?.toLowerCase().includes(searchText.toLowerCase())
                )
            });
            setFilteredNotes(filtered);
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: commonTexts.ERROR_OCCURRED,
                visibilityTime: 1800,
                avoidKeyboard: true,
                bottomOffset: 180

            });
        }
        setLoading(false);
    }, [searchText,searchEnable]);


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
        filteredNotes,
        setFilteredNotes,
        searchEnable,
        setSearchEnable,
        searchText,
        setSearchText
    };
};

export default useNoteViewModel;