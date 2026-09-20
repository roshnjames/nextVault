import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
    const [header, setHeader] = useState('nexVault');
    const [loading,setLoading] = useState(false);
    const [popupVisible,setPopupVisible] = useState(false);

    return (
        <TaskContext.Provider
            value={{
                header,
                setHeader,
                loading,
                setLoading,
                popupVisible,
                setPopupVisible
            }}
        >
            {children}
        </TaskContext.Provider>

    );
}



