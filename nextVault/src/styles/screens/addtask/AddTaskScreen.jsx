import { Text, View } from 'react-native';
import useAddTaskViewModel from '../../../viewmodels/addTask/useAddTaskViewModel';

const AddTaskScreen = ({route}) => {
    const addTaskModel = useAddTaskViewModel({route});

    return(
        <View style={addTaskModel.styles.majorContainer}>
        <View style={addTaskModel.styles.innerContainer}>
            <View ></View>
                <Text style={addTaskModel.styles.addTaskScreenTextStyle}>
                    date{addTaskModel.date}
                </Text>
            </View>
            
        </View>
    )

};

export default AddTaskScreen;