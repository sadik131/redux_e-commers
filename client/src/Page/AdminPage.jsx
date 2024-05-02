import React from 'react'
import Navbar from '../components/navbar/Navbar'
import AdminProduct from '../redux/admin/components/AdminProduct'

function AdminPage() {
  return (
    <div>
        <Navbar>
            <AdminProduct></AdminProduct>
        </Navbar>
    </div>
  )
}

export default AdminPage