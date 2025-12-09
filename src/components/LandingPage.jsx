import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

// Image is loaded from the public folder path below

const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate("/tracker");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        if (loading) return;
        setLoading(true);

        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google login failed:", error);
            alert("Login failed. Please try again.");
        }
        setLoading(false);
    };

    return (
        // 1. UPDATED: Light Pastel Background Gradient
        <div className="flex flex-col items-center justify-center min-h-screen 
                        bg-linear-to-br from-indigo-300 via-purple-200 to-pink-50 p-4 relative">

            {/* Main content area centered. It contrasts well on the light background. */}
            <div className="w-full max-w-sm text-center relative z-10 p-6">

                {/* Floating elements (Adjusted colors to a slightly brighter blue/purple for light background) */}
                <div className="absolute -top-10 -left-10 w-12 h-12 bg-indigo-300 rounded-full shadow-lg 
                                animate-[bounce_4s_infinite_ease-in-out]"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-300 rounded-full shadow-lg
                                animate-[bounce_5s_infinite_ease-in-out]"></div>

                {/* Illustration (Uses public path) */}
                <img
                    src='/landing-illustration.png'
                    alt="Money Illustration"
                    // Removed shadow/rounded-2xl here for a cleaner look on light background
                    className="mx-auto mb-6 w-80 h-80 object-contain rounded-2xl"
                />

                {/* 2. Header Text Color (Using the Dark Indigo/Blue from your dashboard for strong contrast) */}
                <h1 className="text-5xl font-extrabold text-indigo-400 mb-3 drop-shadow-sm">
                    YOUR MONEY ADVENTURE!
                </h1>
                {/* 3. Paragraph Text Color (Using dark gray for contrast) */}
                <p className="mb-10 text-gray-700 text-xl font-medium">
                    Track your allowance, hit your goals, and unlock awesome stuff!
                </p>

                {!user && (
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        // 4. CTA Button Color (Using the Dark Indigo/Blue from your dashboard header)
                        className={`w-full py-4 rounded-xl font-bold text-xl uppercase 
                                    ${loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-indigo-400 text-white hover:bg-indigo-500"} 
                                    transition-all duration-300 shadow-lg transform hover:scale-[1.02]`}
                    >
                        {loading ? "Jumping in..." : "Login with Google"}
                    </button>
                )}
            </div>

            {/* Footer text color (Using dark gray) */}
            <p className="mt-6 text-gray-500 text-sm z-10">
                &copy; 2025 MoneyCanvas. All rights reserved.
            </p>
        </div>
    );
};

export default LandingPage;