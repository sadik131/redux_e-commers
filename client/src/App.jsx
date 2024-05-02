import { useEffect } from "react"
import Home from "./Page/Home"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedIn } from "./redux/auth/authSlice"
import { selectUser } from "./redux/user/userSlice"
import { getCartItemAsync } from "./redux/cart/cartSlice"
import { fetchUserAsync } from "./redux/user/userSlice"
import { Navigate } from "react-router-dom"

function App() {
  const dispatch = useDispatch()

  const user = useSelector(selectLoggedIn)
  
  useEffect(() => {
    if (user) {
      dispatch(fetchUserAsync(user?._id))
      dispatch(getCartItemAsync(user?._id))
    }else{
    }
  }, [user])
  return (

    <>
      <Home></Home>
    </>
  )
}

export default App
