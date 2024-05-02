import React from 'react'
import Navbar from '../components/navbar/Navbar'
import AdminOrder from '../redux/admin/components/AdminOrder'

function AdminOrderPage() {
  return (
    <div>
        <Navbar>
            <AdminOrder></AdminOrder>
        </Navbar>
    </div>
  )
}

export default AdminOrderPage