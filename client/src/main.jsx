import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './redux/auth/components/Login.jsx';
import SignIn from './redux/auth/components/SignIn.jsx';
import Cart from './redux/cart/Cart.jsx';
import CheckOut from './Page/CheckOut.jsx';
import ProductDetails from './redux/products/components/ProductDetails.jsx';
import Order from './Page/Order.jsx';
import PageNotFound from './Page/PageNotFound.jsx';
import OrderPage from './Page/OrderPage.jsx';
import ProfilePage from './Page/ProfilePage.jsx';
import Protected from './Page/Protected.jsx';
import AdminPage from './Page/AdminPage.jsx';
import AdminProtected from './Page/AdminProtected.jsx';
import AdminProductPage from './Page/AdminProductPage.jsx';
import AdminOrderPage from './Page/AdminOrderPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          {/* admin page */}
          <Route path="/admin" element={<AdminProtected><AdminPage></AdminPage></AdminProtected>} />
          <Route path="/admin/productForm" element={<AdminProtected><AdminProductPage></AdminProductPage></AdminProtected>} />
          <Route path="/admin/order" element={<AdminProtected><AdminOrderPage></AdminOrderPage></AdminProtected>} />
          <Route path="/admin/edit/:id" element={<AdminProtected><AdminProductPage></AdminProductPage></AdminProtected>} />
          {/* Protected routes */}
          <Route path="/" element={<Protected><App /></Protected>} />
          <Route path="/productDetail/:id" element={<Protected><ProductDetails /></Protected>} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
          <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
          <Route path="/order" element={<Protected><OrderPage /></Protected>} />
          <Route path="/checkout" element={<Protected><CheckOut /></Protected>} />
          <Route path="/order/:id" element={<Protected><Order /></Protected>} />
          {/* 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
