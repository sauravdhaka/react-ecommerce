import React from 'react';
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
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Home></Home></Protected>),
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
]);

function App() {
  return (
    <div className="App">
          <RouterProvider router={router} />

    </div>
  );
}

export default App;
