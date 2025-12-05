import { React, useState, useContext } from 'react'
import { mainContext } from '../context/MainContextAPI'
import Swal from 'sweetalert2'

const AddExpense = () => {
  const [isHide, setIsHide] = useState(true)
  const { allExpense, setAllExpense } = useContext(mainContext)

  const OnSubmitHandler = (event) => {
    try {
      event.preventDefault()
      const formData = new FormData(event.target)
      const price = formData.get('price') || 0
      const description = formData.get('description') || ''
      const purpose = formData.get('purpose') || ''

      if (!purpose || !description || price <= 0) {
        alert('please fill all details!')
        return
      }
      const entry = {
        price,
        description,
        purpose,
        created_at: new Date(),
        id: Date.now()
      }
      const entries = [
        ...allExpense,
        entry
      ]
      setAllExpense(entries)
      localStorage.setItem('expense', JSON.stringify(entries))

      Swal.fire({
        title: 'Success!',
        text: 'Transaction Added Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      event.target.reset()
      setIsHide(true)

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className='flex justify-end py-3'>
        <button onClick={() => setIsHide(!isHide)}
          className='px-3 py-2 bg-indigo-500 rounded text-white font-medium cursor-pointer'>
          {isHide ? ' Add + ' : 'Close X'}</button>
      </div>
      {!isHide && <div className='py-5'>
        <form onSubmit={OnSubmitHandler} action=''>
          <div className='mb-3'>
            <label htmlFor='price'>Amount</label>
            <input className='w-full py-2 border border-gray-400 rounded outline-none px-3'
              id='price'
              type='number'
              placeholder='Enter Price'
              required
              name='price' />
          </div>
          <div className='mb-3'>
            <label htmlFor='describe'>Description</label>
            <textarea className='w-full py-2 border border-gray-400 rounded outline-none px-3'
              id='describe'
              type='text'
              placeholder='Enter Description'
              required
              name='description'></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='transaction'>Transaction Type</label>
            <select className='w-full py-2 border border-gray-400 rounded outline-none px-3'
              id='transaction'
              required
              name='purpose'>
              <option value="">-- Select --</option>
              <option value='Expense'>Expense</option>
              <option value='Income'>Income</option>
            </select>
          </div>
          <button className='w-full rounded py-2 text-white bg-indigo-500 font-medium'>Save Transaction</button>
        </form>
      </div>}
    </>
  )
}

export default AddExpense
