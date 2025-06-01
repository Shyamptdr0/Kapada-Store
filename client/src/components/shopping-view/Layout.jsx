import React from 'react';
import {Outlet} from "react-router-dom";
import ShoppingHeader from "@/components/shopping-view/Header.jsx";

function ShoppingLayout(props) {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
        {/*    common header*/}
            <ShoppingHeader/>
            <main className="flex flex-col w-full ">
                <Outlet/>
            </main>
        </div>
    );
}

export default ShoppingLayout;