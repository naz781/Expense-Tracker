import React, { useContext } from 'react'
import { mainContext } from '../context/MainContextAPI'
import ExpenseCard from './ExpenseCard'

const ListExpense = () => {
    const { allExpense } = useContext(mainContext)
    return (
        <>
            <table className='w-full border table-auto my-10 py-3 '>

                <tr>
                    <th className='border text-zinc-600 border-gray-300'>No</th>
                    <th className='border text-zinc-600 border-gray-300'>Amount</th>
                    <th className='border text-zinc-600 border-gray-300'>Description</th>
                    <th className='border text-zinc-600 border-gray-300'>purpose</th>
                    <th className='border text-zinc-600 border-gray-300'>Action</th>
                </tr>
                <tbody>
                    {
                        allExpense && allExpense.length > 0 ? <>
                            {
                                allExpense.map((cur, i) => {
                                    return <ExpenseCard data={cur} no={1 + i} key={i} />
                                })
                            }
                        </> : <></>
                    }
                </tbody>

            </table>
        </>
    )
}

export default ListExpense
