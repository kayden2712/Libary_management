import React, { useState } from "react";
import { decodeJwt } from "../utils/jwt";

export default function PageLayout({ title, children }) {
    const token = localStorage.getItem("token");
    const decoded = decodeJwt(token);
    const username = decoded?.sub || "User";

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="font-serif text-amber-900 min-h-screen">

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-amber-50/90 backdrop-blur-sm shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">{title}</h1>

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 px-3 py-2 bg-amber-200 rounded-full hover:bg-amber-300 transition"
                    >
                        <div className="w-8 h-8 bg-amber-700 text-amber-50 rounded-full flex items-center justify-center font-bold">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <span className="hidden sm:inline">{username}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-amber-50 border border-amber-300 rounded-lg shadow-lg py-2">
                            <div className="px-4 py-2 text-amber-800 font-semibold border-b border-amber-200">
                                {username}
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 hover:bg-amber-200 transition"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">{children}</div>
        </div>
    );
}
