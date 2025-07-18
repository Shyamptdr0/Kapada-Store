import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth Section
import AuthLayout from '@/components/auth/Layout.jsx';
import AuthLogin from '@/pages/auth/Login.jsx';
import AuthRegister from '@/pages/auth/Register.jsx';
import CheckAuth from '@/components/common/CheckAuth.jsx';
import UnAuthPage from '@/pages/unauth-page/index.jsx';

// Admin Section
import AdminLayout from '@/components/admin-view/Layout.jsx';
import AdminDashboard from '@/pages/admin-view/Dashboard.jsx';
import AdminProducts from '@/pages/admin-view/Products.jsx';
import AdminOrders from '@/pages/admin-view/Orders.jsx';
import AdminFeatures from '@/pages/admin-view/Features.jsx';

// Shopping Section
import ShoppingLayout from '@/components/shopping-view/Layout.jsx';
import ShoppingHome from '@/pages/shopping-view/Home.jsx';
import ShoppingListing from '@/pages/shopping-view/Listing.jsx';
import ShoppingCheckout from '@/pages/shopping-view/Checkout.jsx';
import ShoppingAccount from '@/pages/shopping-view/Account.jsx';
import NotFoundPage from '@/pages/Not-found/index.jsx';

// Payment Section
import PaypalReturnPage from '@/pages/shopping-view/PaypalReturn.jsx';
import PaymentSuccessPage from '@/pages/shopping-view/payment-success.jsx';

// Search Section
import SearchProducts from '@/pages/shopping-view/Search.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '@/store/auth-slice/index.js';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const isLoading = useSelector((state) => state.globalLoading.isLoading); // Global loader
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('token'));

        const check = async () => {
            if (token) {
                try {
                    await dispatch(checkAuth(token));
                } catch (error) {
                    console.error("Auth check error:", error);
                }
            }
            setAuthChecked(true);
        };

        // Delay to avoid Render free-tier 429 rate-limiting
        const timer = setTimeout(() => check(), 800); // delay 800ms

        return () => clearTimeout(timer); // cleanup on unmount
    }, [dispatch]);


    if (!authChecked) return null;

    return (
        <div className="flex flex-col overflow-hidden bg-white">
            {/* Global Loading Spinner */}
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
                    <span className="ml-4 text-lg font-semibold">Loading...</span>
                </div>
            )}

            <Routes>
                <Route
                    path="/"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AuthLayout />
                        </CheckAuth>
                    }
                />
                <Route
                    path="/auth"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AuthLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="login" element={<AuthLogin />} />
                    <Route path="register" element={<AuthRegister />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AdminLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                </Route>

                <Route
                    path="/shop"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <ShoppingLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="listing" element={<ShoppingListing />} />
                    <Route path="checkout" element={<ShoppingCheckout />} />
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route path="paypal-return" element={<PaypalReturnPage />} />
                    <Route path="payment-success" element={<PaymentSuccessPage />} />
                    <Route path="search" element={<SearchProducts />} />
                </Route>

                <Route path="/unauth-page" element={<UnAuthPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
