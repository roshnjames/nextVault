import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
    const [header, setHeader] = useState('nexVault');
    const [loading,setLoading] = useState(false);
    const [popupVisible,setPopupVisible] = useState(false);
    const [popupText,setPopupText] = useState('');
    const [tasks,setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [disableBackButton,setDisableBackButton] = useState(false);

    return (
        <TaskContext.Provider
            value={{
                header,
                setHeader,
                loading,
                setLoading,
                popupVisible,
                setPopupVisible,
                popupText,
                setPopupText,
                tasks,
                setTasks,
                notes, 
                setNotes,
                disableBackButton,
                setDisableBackButton
            }}
        >
            {children}
        </TaskContext.Provider>

    );
}



