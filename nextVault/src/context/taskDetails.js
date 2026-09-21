import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
    const [header, setHeader] = useState('nexVault');

    return (
        <TaskContext.Provider
            value={{
                header,
                setHeader
            }}
        >
            {children}
        </TaskContext.Provider>

    );
}



