// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import AddExpense from "./components/AddExpense";
import AllExpenses from "./components/AllExpenses";
import ListExpense from "./components/ListExpense";
import { auth } from "./context/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected tracker/dashboard route */}
        <Route
          path="/tracker"
          element={
            user ? (
              <main className="w-[80%] mx-auto mt-5">
                <AddExpense />
                <AllExpenses />
                <ListExpense />
              </main>
            ) : (
              <LandingPage /> // redirect to landing if not logged in
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
