import React, { useContext } from "react";
import { mainContext } from "../context/MainContextAPI";
import ExpenseCard from "./ExpenseCard";

const ListExpense = () => {
    const { allExpense } = useContext(mainContext);

    return (
        <div className="overflow-x-auto mt-10 shadow-lg rounded-lg">
            <table className="w-full border rounded-lg">
                <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="p-3">No</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3 hidden md:table-cell">Description</th>
                        <th className="p-3">Purpose</th>
                        <th className="p-3">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allExpense.length ? (
                        allExpense.map((cur, i) => <ExpenseCard data={cur} no={i + 1} key={cur.id} />)
                    ) : (
                        <tr><td colSpan={5} className="text-center py-5">No Transactions Yet</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListExpense;

