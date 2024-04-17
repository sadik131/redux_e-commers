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
import ProductDetails from './redux/products/components/ProductDetails.jsx'
import Cart from './redux/cart/Cart.jsx'
import CheckOut from './Page/CheckOut.jsx'
import Login from './redux/auth/components/Login.jsx'
import SignIn from './redux/auth/components/SignIn.jsx'
import Protected from './Page/Protected.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><App></App></Protected>),
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
    element: (<Protected><ProductDetails></ProductDetails></Protected>),
  },
  {
    path: "/cart",
    element: (<Protected><Cart></Cart></Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected><CheckOut></CheckOut></Protected>),
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
