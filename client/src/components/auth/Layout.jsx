import React from 'react';
import { Outlet } from "react-router-dom";
import HeaderLogo from "../../assets/logo/header logo.png";

function AuthLayout(props) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side with Logo and Welcome Text */}
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    {/* Logo image with better shape and styling */}
                    <div className="bg-white p-3 rounded-xl shadow-lg inline-block">
                        <img
                            src={HeaderLogo}
                            alt="logo"
                            className="h-28 w-auto object-contain rounded-md"
                        />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
                        Welcome To <br /> Kapdo ki Duniya
                    </h1>
                </div>
            </div>

            {/* Right Side with Forms */}
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
