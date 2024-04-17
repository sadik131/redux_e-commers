import { useEffect } from "react"
import Home from "./Page/Home"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedIn } from "./redux/auth/authSlice"
import { getCartItemAsync } from "./redux/cart/cartSlice"

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedIn)
  useEffect(() => {
    if (user) {
      console.log("first")
      dispatch(getCartItemAsync(user.id))
    }
  }, [user])
  return (

    <>
      <Home></Home>
    </>
  )
}

export default App
