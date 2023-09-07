import React, { useEffect } from 'react';
import logo from './logo.svg';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/components/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetails from './features/product-list/components/ProductDetails';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/user/components/UserOrders';
import UserOrderPage from './pages/UserOrderPage';
import UserProfile from './features/user/components/UserProfile'
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUser } from './features/user/UserAPI';
import { fetchLoggedInUserAsync } from './features/user/UserSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import AdminHome from './pages/AdminHome'
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckOut';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Home></Home></Protected>),
  },
  {
    path: "/admin",
    element: (<ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>),
  },
  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/signup",
    element: (<SignupPage></SignupPage>),
  },
  { 
    path: "/cart",
    element: (<Protected><CartPage></CartPage></Protected>),
  },
  { 
    path: "/checkout",
    element: (<Protected><Checkout></Checkout></Protected>),
  },
  { 
    path: "/productdetail/:id",
    element: (<Protected><ProductDetailPage></ProductDetailPage></Protected>),
  },
  { 
    path: "/admin/productdetail/:id",
    element: (<ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>),
  },
  { 
    path: "/admin/product-form",
    element: (<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  { 
    path: "/admin/orders",
    element: (<ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>),
  },
  { 
    path: "/admin/product-form/edit/:id",
    element: (<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  { 
    path: "/order-success/:id",
    element: (<OrderSuccessPage></OrderSuccessPage>),
  },
  { 
    path: "/orders",
    element: (<UserOrderPage></UserOrderPage>),
  },
  { 
    path: "/profile",
    element: (<UserProfilePage></UserProfilePage>),
  },
  { 
    path: "/logout",
    element: (<Logout></Logout>),
  },
  { 
    path: "/forgot-password",
    element: (<ForgotPasswordPage></ForgotPasswordPage>),
  },
  { 
    path: "/stripe-checkout",
    element: (<Protected><StripeCheckout></StripeCheckout></Protected>),
  },
  { 
    path: "*",
    element: (<PageNotFound></PageNotFound>),
  },
]);

function App() {
  const dispatch = useDispatch()
  const user  = useSelector(selectLoggedInUser)
  const userChecked = useSelector(selectUserChecked)

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  useEffect(()=>{
    
    if(user){

      dispatch(fetchItemsByUserIdAsync())
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])
  return (
    <div className="App">
          {userChecked && <RouterProvider router={router} />}

    </div>
  );
}

export default App;
