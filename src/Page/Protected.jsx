import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedIn } from '../redux/auth/authSlice'

function Protected({ children }) {
  const user = useSelector(selectLoggedIn)
  console.log(user)

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>
  }
  return children
}

export default Protected