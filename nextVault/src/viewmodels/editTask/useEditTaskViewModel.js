import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { TaskContext } from "../../context/taskDetails";
import { editTaskScreenTexts } from "../../strings/textLoader";
import addTaskScreenStyles from "../../styles/screens/addTask/addTaskScreen.styles";

const useEditTaskViewModel = (params) => {
    const {setHeader, tasks, setTasks } = useContext(TaskContext);
    const styles = addTaskScreenStyles();
    const taskId = params.taskId;
    const [t_name, setT_name] = useState('');
    const [t_details, setT_details] = useState('');
    

    useFocusEffect(
        useCallback(()=>{
            console.log('taskid from viewmodal :',taskId);
        },[])
    );

    return{
        editTaskScreenTexts,
        setHeader,
        styles,
    };
};

export default useEditTaskViewModel;