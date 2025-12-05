import { React, useContext } from 'react'
import { mainContext } from '../context/MainContextAPI'

const AllExpenses = () => {
    const { allExpense } = useContext(mainContext)
    console.log(allExpense)

    const calculate = (purpose) => {
        if (!allExpense.length) return 0;

        const entry = allExpense
            .filter(cur => cur.purpose === purpose)
            .map(cur => Number(cur.price));

        if (entry.length === 0) return 0;
        if (entry.length === 1) return entry[0];

        return entry.reduce((prev, cur) => prev + cur, 0);
    };

    const income = calculate('Income')
    const expense = calculate('Expense')

    let totalMoney = income - expense;

    if (income === 0 && expense > 0) totalMoney = -expense;
    if (income > 0 && expense === 0) totalMoney = income;
    if (income === 0 && expense === 0) totalMoney = 0;


    return (
        <>
            <div className='grid grid-cols-1 gap-y-5 lg:grid-cols-2'>
                <div className='w-[96%] lg:w-[80%] mx-auto py-5 px-3 rounded border border-gray-300'>
                    <p className='font-medium text-2xl text-green-400'>Income</p>
                    <p className='text-3xl font-bold text-end text-green-500'>${calculate('Income') || 0}</p>
                </div>

                <div className='w-[96%] lg:w-[80%] mx-auto py-5 px-3 rounded border border-gray-300'>
                    <p className='font-medium text-2xl text-red-400'>Expense</p>
                    <p className='text-3xl font-bold text-end text-red-500'>${calculate('Expense') || 0}</p>
                </div>
            </div>
            <div className='col-span-2 py-5 px-3 rounded border mt-5 border-gray-300'>
                <p className='font-medium text-2xl text-indigo-500'>Total Balance</p>
                <p className='text-3xl font-bold text-end text-indigo-500'>${totalMoney}</p>
            </div>
        </>
    )
}

export default AllExpenses
