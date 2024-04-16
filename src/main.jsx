import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Page/Login.jsx'
import SignIn from './Page/SignIn.jsx'
import ProductDetails from './redux/products/components/ProductDetails.jsx'
import Cart from './redux/cart/Cart.jsx'
import CheckOut from './Page/CheckOut.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App></App>),
  },
  {
    path: "/login",
    element: (<Login></Login>),
  },
  {
    path: "/signin",
    element: (<SignIn></SignIn>),
  },
  {
    path: "/productDetail/:id",
    element: (<ProductDetails></ProductDetails>),
  },
  {
    path: "/cart",
    element: (<Cart></Cart>),
  },
  {
    path: "/checkout",
    element: (<CheckOut></CheckOut>),
  },
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
