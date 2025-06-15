import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LogOut} from "lucide-react";
import {useDispatch} from "react-redux";
import {logoutUser, resetTokenAndCrendentails} from "@/store/auth-slice/index.js";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/logo/header logo.png"


function AdminHeader({setOpen}) {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleLogout() {
        //dispatch(logoutUser())
        dispatch(resetTokenAndCrendentails())
        sessionStorage.clear()
        navigate('/auth/login')
    }
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-bottom">
           <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block cursor-pointer">
               <AlignJustify />
               <span className="sr-only">Toggle Menu</span>
           </Button>
            <img src={Logo} alt="logo" className="h-12 w-30 ml-4"/>
            <div className="flex flex-1 justify-end">
                <Button onClick={handleLogout} className="cursor-pointer inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;