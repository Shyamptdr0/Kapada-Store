import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LogOut} from "lucide-react";
import {useDispatch} from "react-redux";
import {logoutUser} from "@/store/auth-slice/index.js";


function AdminHeader({setOpen}) {

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser())
    }
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-bottom">
           <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block cursor-pointer">
               <AlignJustify />
               <span className="sr-only">Toggle Menu</span>
           </Button>
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