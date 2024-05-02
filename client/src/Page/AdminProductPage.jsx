import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProductForm from '../redux/admin/components/ProductForm'

function AdminPage() {
  return (
    <div>
        <Navbar>
            <ProductForm></ProductForm>
        </Navbar>
    </div>
  )
}

export default AdminPage