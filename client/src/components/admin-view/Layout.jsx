import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import AdminSidebar from "@/components/admin-view/Sidebar.jsx";
import AdminHeader from "@/components/admin-view/Header.jsx";

function AdminLayout(props) {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            {/*Admin Sidebar*/}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                {/*Admin Header*/}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;