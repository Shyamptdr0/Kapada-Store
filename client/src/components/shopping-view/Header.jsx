import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CircleUser, House, LogOut, Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config/index.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { resetTokenAndCrendentails } from "@/store/auth-slice/index.js";
import UserCartWrapper from "@/components/shopping-view/CartWrapper.jsx";
import { fetchCartItems } from "@/store/shop/cart-slice/index.js";
import { Label } from "@/components/ui/label.jsx";

// MenuItems Component
function MenuItems({ onItemClick }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem('filters');
        const currentFilter =
            getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' &&
            getCurrentMenuItem.id !== 'search'
                ? { category: [getCurrentMenuItem.id] }
                : null;

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        location.pathname.includes('listing') && currentFilter !== null
            ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
            : navigate(getCurrentMenuItem.path);

        if (onItemClick) onItemClick();
    }

    return (
        <nav className='flex flex-col mt-10 ml-6 mb-3 lg:mb-0 lg:mt-0 lg:items-center gap-6 lg:flex-row'>
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                    onClick={() => handleNavigate(menuItem)}
                    className='text-sm font-medium cursor-pointer'
                    key={menuItem.id}
                >
                    {menuItem.label}
                </Label>
            ))}
        </nav>
    );
}

// ShoppingHeader Component
function ShoppingHeader(props) {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openMenuSheet, setOpenMenuSheet] = useState(false);
    const [openCartSheet, setOpenCartSheet] = useState(false);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCartItems(user.id));
        }
    }, [dispatch, user?.id]);

    const handleLogout = () => {
        dispatch(resetTokenAndCrendentails());
        sessionStorage.clear();
        navigate('/auth/login');
        setOpenMenuSheet(false);
    };

    const handleCartClick = () => {
        setOpenMenuSheet(false); // close left menu sheet
        setOpenCartSheet(true);  // open cart sheet
    };

    const HeaderRightContent = ({ isMobile = false }) => (
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4 ml-6 `}>
            <Button onClick={handleCartClick} variant='outline' size='icon' className="relative">
                <ShoppingCart className='w-6 h-6' />
                <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                    {cartItems?.items?.length || 0}
                </span>
                <span className='sr-only'>User cart</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className='bg-black cursor-pointer'>
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.userName?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56'>
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                        navigate('/shop/account');
                        setOpenMenuSheet(false);
                    }}>
                        <CircleUser className='mr-2 h-4 w-4' />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );

    return (
        <header className='fixed top-0 z-40 w-full border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to='/shop/home' className='flex items-center gap-2'>
                    <House className='h-6 w-6' />
                    <span className='font-bold'>E-Commerce Kapada Store</span>
                </Link>

                {/* Mobile Menu Sheet */}
                <Sheet open={openMenuSheet} onOpenChange={setOpenMenuSheet}>
                    <SheetTrigger asChild>
                        <Button variant='outline' size="icon" className="lg:hidden">
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems onItemClick={() => setOpenMenuSheet(false)} />
                        <HeaderRightContent isMobile />
                    </SheetContent>
                </Sheet>

                {/* Desktop Menu */}
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className='hidden lg:block ml-6'>
                    <HeaderRightContent />
                </div>

                {/* Cart Sheet */}
                <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
                    <UserCartWrapper
                        setOpenCartSheet={setOpenCartSheet}
                        cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
                    />
                </Sheet>
            </div>
        </header>
    );
}

export default ShoppingHeader;
