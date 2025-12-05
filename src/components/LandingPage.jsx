// src/components/LandingPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate("/tracker"); // redirect if already logged in
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/tracker"); // redirect after login
        } catch (error) {
            console.error(error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to MoneyCanvas!</h1>
            <p className="mb-6 text-lg">Track your income and expenses easily.</p>
            {!user && (
                <button
                    onClick={handleGoogleLogin}
                    className="bg-white text-indigo-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default LandingPage;
