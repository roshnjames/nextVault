import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useRef, useState } from 'react';
import { TaskContext } from '../../context/taskDetails';
import { addTaskScreenTexts, ON_OFF } from '../../strings/textLoader';
import addTaskScreenStyles from '../../styles/addTask/addTaskScreen.styles';
import { addTaskPriorityVals } from '../../utils/dropDownValues';

const useAddTaskViewModel = ({route}) => {
    const navigation = useNavigation();
    const date = route?.params.date;
    const { setHeader } = useContext(TaskContext);
    const styles = addTaskScreenStyles();

    const addTaskNewTask = useRef('');
    const addTaskNewTaskDetails = useRef('');
    const [addTaskPriority,setAddTaskPriority] = useState(addTaskPriorityVals[1].label);
    const [addTaskAlertEnabled,setAddTaskAlertEnabled] = useState(true);
    const [addTaskImageCaptured,setAddTaskImageCaptured] = useState(null);

    useFocusEffect(
        useCallback(()=>{
            setHeader(addTaskScreenTexts.HEADING);
        },[])
    );

    const addTaskImageSaver = () => {
        console.log('save image of task');
    };

    return {
        styles,
        date,
        navigation,
        ON_OFF,
        addTaskScreenTexts,
        addTaskPriorityVals,
        addTaskNewTask,
        addTaskNewTaskDetails,
        addTaskPriority,
        setAddTaskPriority,
        addTaskAlertEnabled,
        setAddTaskAlertEnabled,
        addTaskImageSaver,
        addTaskImageCaptured,
        setAddTaskImageCaptured
    }

}
export default useAddTaskViewModel;