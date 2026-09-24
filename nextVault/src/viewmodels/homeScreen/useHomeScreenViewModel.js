import { useContext } from 'react';
import { TaskContext } from "../../context/taskDetails";
import { homeScreenTexts } from '../../strings/textLoader';
import HomeScreenStyles from "../../styles/screens/homescreen/homeScreen.styles";


const useHomeScreenViewModel = () => {
    const styles = HomeScreenStyles();
    const { setHeader } = useContext(TaskContext);

    return {
        styles,
        homeScreenTexts,
        setHeader
    }

};

export default useHomeScreenViewModel;