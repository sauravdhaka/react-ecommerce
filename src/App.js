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
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>),
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
    element: (<CartPage></CartPage>),
  },
  { 
    path: "/checkout",
    element: (<Checkout></Checkout>),
  },
  { 
    path: "/productdetail/:id",
    element: (<ProductDetailPage></ProductDetailPage>),
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
