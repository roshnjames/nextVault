import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { TaskContext } from '../../context/taskDetails';
import { addTaskScreenTexts } from '../../strings/textLoader';
import addTaskScreenStyles from '../../styles/addTask/addTaskScreen.styles';

const useAddTaskViewModel = ({route}) => {
    const navigation = useNavigation();
    const date = route?.params.date;
    const { setHeader } = useContext(TaskContext);
    const styles = addTaskScreenStyles();

    useFocusEffect(
        useCallback(()=>{
            setHeader(addTaskScreenTexts.HEADING);
        },[])
    );

    return {
        styles,
        date,
        navigation
    }

}
export default useAddTaskViewModel;