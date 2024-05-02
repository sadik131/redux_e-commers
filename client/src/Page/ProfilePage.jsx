import React from 'react'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../redux/user/components/UserProfile'

function ProfilePage() {
  return (
    <Navbar>
        <h1 className='text-2xl font-semibold my-2'>Profile</h1>
        <UserProfile></UserProfile>
    </Navbar>
  )
}

export default ProfilePage