import React, {useEffect} from 'react'
import {Routes,Route} from "react-router-dom";

// Auth Section
import AuthLayout from "@/components/auth/Layout.jsx";
import AuthLogin from "@/pages/auth/Login.jsx";
import AuthRegister from "@/pages/auth/Register.jsx";
import CheckAuth from "@/components/common/CheckAuth.jsx";
import UnAuthPage from "@/pages/unauth-page/index.jsx";

// Admin Section
import AdminLayout from "@/components/admin-view/Layout.jsx";
import AdminDashboard from "@/pages/admin-view/Dashboard.jsx";
import AdminProducts from "@/pages/admin-view/Products.jsx";
import AdminOrders from "@/pages/admin-view/Orders.jsx";
import AdminFeatures from "@/pages/admin-view/Features.jsx";

//Shopping Section
import ShoppingLayout from "@/components/shopping-view/Layout.jsx";
import NotFoundPage from "@/pages/Not-found/index.jsx";
import ShoppingHome from "@/pages/shopping-view/Home.jsx";
import ShoppingListing from "@/pages/shopping-view/Listing.jsx";
import ShoppingCheckout from "@/pages/shopping-view/Checkout.jsx";
import ShoppingAccount from "@/pages/shopping-view/Account.jsx";

//Payment Section
import PaypalReturnPage from "@/pages/shopping-view/PaypalReturn.jsx";
import PaymentSuccessPage from "@/pages/shopping-view/payment-success.jsx";

//Search Section
import SearchProducts from "@/pages/shopping-view/Search.jsx";


import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "@/store/auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton"




function App() {


    const {isAuthenticated, user, isLoading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch]);

    if(isLoading)return  <Skeleton className="w-full bg-black h-[600px] " />


    return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">

          <Routes>
              <Route path="/" element={
                  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                      <AuthLayout/>
                  </CheckAuth>
              }/>
              <Route path="/auth" element={
                      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                         <AuthLayout/>
                      </CheckAuth>
              }>
                  <Route path="login" element={<AuthLogin/>}/>
                  <Route path="register" element={<AuthRegister/>}/>
              </Route>

              <Route path="/admin" element={
                     <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AdminLayout/>
                     </CheckAuth>
              }>
                  <Route path="dashboard" element={<AdminDashboard/>}/>
                  <Route path="products" element={<AdminProducts/>}/>
                  <Route path="orders" element={<AdminOrders/>}/>
                  <Route path="features" element={<AdminFeatures/>}/>
              </Route>

              <Route path="/shop" element={
                  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                      <ShoppingLayout/>
                  </CheckAuth>
              }>
                    <Route path="home" element={<ShoppingHome/>}/>
                    <Route path="listing" element={<ShoppingListing/>}/>
                    <Route path="checkout" element={<ShoppingCheckout/>}/>
                    <Route path="account" element={<ShoppingAccount/>}/>
                    <Route path="paypal-return" element={<PaypalReturnPage/>}/>
                    <Route path="payment-success" element={<PaymentSuccessPage/>}/>
                    <Route path="search" element={<SearchProducts/>}/>

              </Route>


              <Route path="/unauth-page" element={<UnAuthPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
