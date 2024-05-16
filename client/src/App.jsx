import { useEffect } from "react"
import Home from "./Page/Home"
import { useDispatch, useSelector } from "react-redux"
import { getCartItemAsync } from "./redux/cart/cartSlice"
import { fetchUserAsync } from "./redux/user/userSlice"
import { selectUserToken } from "./redux/auth/authSlice"

function App() {
  const dispatch = useDispatch()

  const user = useSelector(selectUserToken)
  console.log("user")
  
  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchUserAsync())
  //     dispatch(getCartItemAsync())
  //   }else{
  //   }
  // }, [user])
  return (

    <>
      <Home></Home>
    </>
  )
}

export default App
