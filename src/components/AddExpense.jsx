import React, { useState, useContext } from "react";
import { mainContext } from "../context/MainContextAPI";
import { db, auth } from "../context/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";

const AddExpense = () => {
  const [isHide, setIsHide] = useState(true);
  const { allExpense, setAllExpense } = useContext(mainContext);

  const OnSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const price = Number(formData.get("price")) || 0;
    const description = formData.get("description") || "";
    const purpose = formData.get("purpose") || "";

    if (!purpose || !description || price <= 0) {
      alert("Please fill all details!");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to add a transaction.");
      return;
    }

    const entry = {
      price,
      description,
      purpose,
      created_at: Timestamp.fromDate(new Date())
    };

    try {
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, "users", userId, "expenses"), entry);

      setAllExpense(prev => [{ ...entry, id: docRef.id }, ...prev]);

      Swal.fire({
        title: "Success!",
        text: "Transaction Added Successfully",
        icon: "success",
        confirmButtonText: "OK"
      });

      event.target.reset();
      setIsHide(true);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <>
      <div className="flex justify-end py-4">
        <button
          onClick={() => setIsHide(!isHide)}
          className="px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-indigo-500 to-indigo-600 text-white 
                     shadow hover:scale-105 transition"
        >
          {isHide ? "Add +" : "Close ✕"}
        </button>
      </div>

      {!isHide && (
        <form onSubmit={OnSubmitHandler} className="bg-white shadow-lg p-6 rounded-xl space-y-4">
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              required
              className="w-full border px-3 py-2 rounded-md outline-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              required
              className="w-full border px-3 py-2 rounded-md outline-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Transaction Type</label>
            <select
              name="purpose"
              required
              className="w-full border px-3 py-2 rounded-md outline-indigo-500"
            >
              <option value="">-- Select Type --</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold 
                             shadow hover:bg-indigo-700 transition">
            Save Transaction
          </button>
        </form>
      )}
    </>
  );
};

export default AddExpense;

