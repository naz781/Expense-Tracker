import React from "react"
import Navbar from "./components/Navbar"
import AllExpenses from "./components/AllExpenses"
import AddExpense from "./components/AddExpense"
import ListExpense from "./components/ListExpense"

function App() {


  return (
    <>
      <Navbar />
      <main className='w-[80%] mx-auto'>
        <AddExpense />
        <AllExpenses />
        <ListExpense />
      </main>

    </>
  )
}

export default App
