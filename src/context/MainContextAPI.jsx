import { React, createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext()

export const MainContextAPI = ({ children }) => {
    const [allExpense, setAllExpense] = useState(JSON.parse(localStorage.getItem('expense') || '[]'))
    return (
        <mainContext.Provider value={{ allExpense, setAllExpense }}>{children}</mainContext.Provider>
    )
}


