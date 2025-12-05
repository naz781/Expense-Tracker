// import { React, createContext, useState } from 'react'

// // eslint-disable-next-line react-refresh/only-export-components
// export const mainContext = createContext()

// export const MainContextAPI = ({ children }) => {
//     const [allExpense, setAllExpense] = useState(JSON.parse(localStorage.getItem('expense') || '[]'))
//     return (
//         <mainContext.Provider value={{ allExpense, setAllExpense }}>{children}</mainContext.Provider>
//     )
// }
import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const mainContext = createContext();

export const MainContextAPI = ({ children }) => {
    const [allExpense, setAllExpense] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            if (!auth.currentUser) return;

            try {
                const userId = auth.currentUser.uid;
                const expensesRef = collection(db, "users", userId, "expenses");
                const q = query(expensesRef, orderBy("created_at", "desc"));
                const snapshot = await getDocs(q);

                const expensesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setAllExpense(expensesData);
            } catch (error) {
                console.error("Error fetching expenses:", error.message);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) fetchExpenses();
            else setAllExpense([]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <mainContext.Provider value={{ allExpense, setAllExpense }}>
            {children}
        </mainContext.Provider>
    );
};

