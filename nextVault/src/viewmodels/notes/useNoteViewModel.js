import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { noteScreenTexts } from "../../strings/textLoader";
import { TaskContext } from "../../context/taskDetails";
    
const useNoteViewModel = () => {
    const {setHeader, setLoading} = useContext(TaskContext);

    useFocusEffect(
        useCallback(()=>{
            console.log('notes viewmodel rendered');
        },[])
    );

    return{
        noteScreenTexts,
        setHeader
    };
};

export default useNoteViewModel;