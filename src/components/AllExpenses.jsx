import React, { useContext } from "react";
import { mainContext } from "../context/MainContextAPI";

const AllExpenses = () => {
    const { allExpense } = useContext(mainContext);

    const calculate = (purpose) => {
        const entry = allExpense.filter(cur => cur.purpose === purpose).map(cur => Number(cur.price));
        return entry.length ? entry.reduce((a, b) => a + b, 0) : 0;
    };

    const income = calculate("Income");
    const expense = calculate("Expense");
    const totalMoney = income - expense;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div className="border rounded-lg p-5 shadow-md">
                    <p className="text-xl font-semibold text-green-600">Total Income</p>
                    <p className="text-3xl font-bold text-green-700 text-right">${income}</p>
                </div>

                <div className="border rounded-lg p-5 shadow-md">
                    <p className="text-xl font-semibold text-red-500">Total Expense</p>
                    <p className="text-3xl font-bold text-red-600 text-right">${expense}</p>
                </div>
            </div>

            <div className="border rounded-lg mt-6 p-6 shadow-lg bg-linear-to-r from-indigo-50 to-indigo-100">
                <p className="text-2xl font-semibold text-indigo-600">Balance Left</p>
                <p className="text-4xl font-bold text-indigo-700 text-right">${totalMoney}</p>
            </div>
        </>
    );
};

export default AllExpenses;

