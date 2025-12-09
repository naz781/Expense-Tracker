import React, { useEffect, useState } from "react";
import { auth } from "../context/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
            alert("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
            alert("Logout failed: " + error.message);
        }
    };

    return (
        <header className="bg-indigo-500 shadow-md py-4">
            <nav className="lg:w-4/5 mx-auto flex items-center justify-between px-4">
                <a href="/" className="text-2xl font-extrabold text-white">
                    MoneyCanvas
                </a>
                <div className="flex gap-4">
                    {!user ? (
                        <button
                            onClick={handleGoogleLogin}
                            className="bg-white text-indigo-500 px-3 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <span className="text-white">Hello, {user.displayName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-indigo-500 px-3 py-1 rounded hover:bg-gray-200 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
