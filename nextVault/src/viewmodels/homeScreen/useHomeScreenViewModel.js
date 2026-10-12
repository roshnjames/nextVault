import {
    CommonActions,
    useFocusEffect,
    useNavigation
} from '@react-navigation/native';
import {
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import Toast from 'react-native-toast-message';
import { TaskContext } from "../../context/taskDetails";
import {
    deleteTask,
    fetchAllTasks,
    updateTaskCompletion
} from '../../database/database';
import { scheduleScreenButtons } from '../../images/imageLoader';
import {
    colorValues,
    commonTexts,
    homeScreenTexts,
    scheduleScreenTexts
} from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";
import { addTaskPriorityVals } from '../../utils/dropDownValues';


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const {
        loading,
        setLoading,
        setHeader,
        tasks,
        setTasks,
        popupVisible,
        setPopupVisible,
        popupText,
        setPopupText,
        setDisableBackButton
    } = useContext(TaskContext);

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(
        getLocalDateString()
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState(false);
    const [activeFilter, setActiveFilter] = useState('date');

    function getLocalDateString(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    const isPendingTask = useCallback((task, now = Date.now()) => {

        if (!task.task_date || !task.task_time) {
            return false;
        }
        const [year, month, day] = task.task_date.split('-').map(Number);
        const [hour, min] = task.task_time.split(':').map(Number);
        // Ignore invalid date/time values.
        if (
            !year || !month || !day ||
            !Number.isFinite(hour) ||
            !Number.isFinite(min) ||
            month < 1 || month > 12 ||
            day < 1 || day > 31 ||
            hour < 0 || hour > 23 ||
            min < 0 || min > 59
        ) {
            return false;
        }

        const taskTimestamp = new Date(
            year,
            month - 1,
            day,
            hour,
            min
        ).getTime();

        return (
            Number.isFinite(taskTimestamp) &&
            taskTimestamp < now &&
            task.task_is_completed === 0
        );
    }, []);


    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            const fetchTasks = async () => {
                try {
                    setLoading(true);

                    const updatedTasks = await fetchAllTasks();

                    if (!isActive) {
                        return;
                    }

                    setTasks(updatedTasks);

                } catch (error) {
                    if (isActive) {
                        Toast.show({
                            type: 'error',
                            position: 'bottom',
                            text1: commonTexts.ERROR_OCCURRED,
                            visibilityTime: 1800,
                            avoidKeyboard: true,
                            bottomOffset: 180
                        });
                    }
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            };
            setDisableBackButton(true);
            if (navigation.getState().routes.length > 1) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'home'
                            }
                        ]
                    })
                );
            }

            fetchTasks();

            return () => {
                isActive = false;
                setDisableBackButton(false);
                setShowDatePicker(false);
            };

        }, [navigation, setDisableBackButton, setLoading, setTasks])
    );


    useEffect(() => {

        const now = Date.now();
        const hasPendingTasks = tasks.some(
            task => isPendingTask(task, now)
        );
        setPendingTasks(hasPendingTasks);
        if (activeFilter === 'pending') {
            setFilteredTasks(
                tasks.filter(task => isPendingTask(task, now))
            );
        } else {
            setFilteredTasks(
                tasks.filter(task => task.task_date === selectedDate)
            );
        }
    }, [tasks, selectedDate, activeFilter, isPendingTask]);


    const handlePendingTasksPress = () => {
        setActiveFilter('pending');
    };


    const handleTaskColor = (
        priority = addTaskPriorityVals[1].label,
        isCompleted = false
    ) => {
        if (isCompleted === 1) {
            return colorValues.GREEN;
        }

        switch (priority) {
            case addTaskPriorityVals[0].value:
                return colorValues.CYAN;
            case addTaskPriorityVals[1].value:
                return colorValues.BLUE;
            case addTaskPriorityVals[2].value:
                return colorValues.PINK;
            case addTaskPriorityVals[3].value:
                return colorValues.ORANGE;
            case addTaskPriorityVals[4].value:
                return colorValues.RED;
            default:
                return colorValues.BLUE;
        }
    };


    const handleAddTask = () => {
        navigation.navigate('schedule');
    };


    const handleDateSelection = (_, date) => {
        try {
            if (date) {
                setSelectedDate(getLocalDateString(date));
                setActiveFilter('date');
                setShowDatePicker(false);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: commonTexts.ERROR_OCCURRED,
                visibilityTime: 1800,
                avoidKeyboard: true,
                bottomOffset: 180
            });
        }
    };


    const handleDeleteTask = async (taskId) => {
        try {
            const delRes = await deleteTask(taskId);
            if (!delRes) {
                throw new Error(commonTexts.FAILED);
            }
            const updatedTasks = await fetchAllTasks();
            setTasks(updatedTasks);
            setPopupText(homeScreenTexts.DELETE_SUCCESS);
        } catch (error) {
            setPopupText(homeScreenTexts.DELETE_FAILED);
        } finally {
            setPopupVisible(true);
        }
    };


    const handleEditTask = (taskId) => {
        navigation.navigate('editTask', { taskId });
    };


    const handleTaskCompletion = async (taskId) => {
        try {
            const res = await updateTaskCompletion(taskId);
            if (!res) {
                throw new Error(commonTexts.ERROR_OCCURRED);
            }
            const updatedTasks = await fetchAllTasks();
            setTasks(updatedTasks);
        } catch (error) {
            setPopupText(commonTexts.ERROR_OCCURRED);
            setPopupVisible(true);
        }
    };


    return {
        styles,
        loading,
        homeScreenTexts,
        scheduleScreenTexts,
        setHeader,
        tasks,
        filteredTasks,
        scheduleScreenButtons,
        handleDeleteTask,
        popupVisible,
        setPopupVisible,
        popupText,
        handleAddTask,
        selectedDate,
        showDatePicker,
        setShowDatePicker,
        handleDateSelection,
        handleTaskColor,
        handleTaskCompletion,
        handleEditTask,
        pendingTasks,
        handlePendingTasksPress
    };

};

export default useHomeScreenViewModel;