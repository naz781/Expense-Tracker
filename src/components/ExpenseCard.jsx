// import React, { useContext } from 'react'
// import { mainContext } from '../context/MainContextAPI'
// import Swal from 'sweetalert2'



// const ExpenseCard = ({ data, no }) => {
//     const { allExpense, setAllExpense } = useContext(mainContext)
//     const deleteEntry = () => {
//         const new_entry = allExpense.filter((cur) => cur.id !== data.id)
//         setAllExpense(new_entry)
//         Swal.fire({
//             title: 'Deleted!',
//             text: 'Transaction Removed Successfully',
//             icon: 'success',
//             confirmButtonText: 'OK'
//         })
//         localStorage.setItem('expense', JSON.stringify(new_entry))
//     }
//     return (
//         <tr>
//             <td className='border border-gray-300 py-3 px-3'>{no}</td>
//             <td className='border border-gray-300 py-3 px-3'>${data.price}</td>
//             <td className='border border-gray-300 py-3 px-3'>{data.description}</td>
//             <td className={`border border-gray-300 text-center py-3 px-3`}>
//                 {data.purpose == 'Income' &&
//                     <span className='px-4 py-1 bg-green-100 text-green-600 rounded'>{'Income'}</span>}
//                 {data.purpose == 'Expense' &&
//                     <span className='px-4 py-1 bg-red-100 text-red-600 rounded'>{'Expense'}</span>}</td>
//             <td className="border border-gray-300 py-3 px-3 text-center space-x-4">
//                 <button onClick={deleteEntry} className="px-4 py-1 bg-red-400 text-red-50 rounded cursor-pointer">
//                     Delete
//                 </button>

//             </td>
//         </tr>
//     )
// }
// export default ExpenseCard
import React, { useContext } from "react";
import { mainContext } from "../context/MainContextAPI";
import Swal from "sweetalert2";
import { db, auth } from "../context/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ExpenseCard = ({ data, no }) => {
    const { allExpense, setAllExpense } = useContext(mainContext);

    const deleteEntry = async () => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;

        try {
            const userId = auth.currentUser.uid;
            await deleteDoc(doc(db, "users", userId, "expenses", data.id));

            setAllExpense(allExpense.filter(cur => cur.id !== data.id));

            Swal.fire({
                title: "Deleted!",
                text: "Transaction Removed Successfully",
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error("Error deleting transaction:", error.message);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <tr>
            <td className="border border-gray-300 py-3 px-3">{no}</td>
            <td className="border border-gray-300 py-3 px-3">${data.price}</td>
            <td className="border border-gray-300 py-3 px-3">{data.description}</td>
            <td className="border border-gray-300 text-center py-3 px-3">
                {data.purpose === "Income" ? (
                    <span className="px-4 py-1 bg-green-100 text-green-600 rounded">Income</span>
                ) : (
                    <span className="px-4 py-1 bg-red-100 text-red-600 rounded">Expense</span>
                )}
            </td>
            <td className="border border-gray-300 py-3 px-3 text-center">
                <button
                    onClick={deleteEntry}
                    className="px-4 py-1 bg-red-400 text-red-50 rounded cursor-pointer"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ExpenseCard;
