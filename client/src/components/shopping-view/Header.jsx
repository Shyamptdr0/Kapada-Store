import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {CircleUser, House, LogOut, Menu, ShoppingCart} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {shoppingViewHeaderMenuItems} from "@/config/index.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {logoutUser} from "@/store/auth-slice/index.js";


function MenuItems(){

    return <nav className='flex flex-col ml-6  mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
            shoppingViewHeaderMenuItems.map((menuItem)=>
                <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav>
}

function HeaderRightContent(){
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(logoutUser())
    }

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4 ml-6'>
        <Button variant='outline' size='icon'>
            <ShoppingCart className='w-6 h-6' />
            <span className='sr-only'>User cart</span>
        </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Avatar className='bg-black '>
                       <AvatarFallback className="bg-black text-white font-extrabold">
                           {user?.userName[0].toUpperCase()}
                       </AvatarFallback>
                   </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56'>
                    <DropdownMenuLabel>
                        Logged in as {user?.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
                        <CircleUser className='mr-2 h-4 w-4' />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>handleLogout()}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    </div>
}

function ShoppingHeader(props) {

    const {isAuthenticated} = useSelector(state => state.auth);


    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to='/shop/home' className='flex items-center gap-2'>
                    <House className='h-6 w-6' />
                    <span className='font-bold'>E-Commerce Kapada Store</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size="icon" className="lg:hidden">
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs ">
                       <MenuItems/>
                        <HeaderRightContent/>
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems/>
                </div>
                        <div className='hidden lg:block ml-6'>
                        <HeaderRightContent/>
                        </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;