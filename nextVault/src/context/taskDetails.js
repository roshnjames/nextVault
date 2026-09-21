import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
    const [header, setHeader] = useState('nexVault');
    const [loading,setLoading] = useState(false);
    const [popupVisible,setPopupVisible] = useState(false);
    const [popupText,setPopupText] = useState('');

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
                setPopupText
            }}
        >
            {children}
        </TaskContext.Provider>

    );
}



