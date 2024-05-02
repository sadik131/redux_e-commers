import React from 'react'
import Navbar from '../components/navbar/Navbar'
import UserOrder from '../redux/user/components/UserOrder'

function OrderPage() {
    return (
        <Navbar>
            <h1 className='text-2xl font-semibold my-2'>My Order</h1>
            <UserOrder></UserOrder>
        </Navbar>
    )
}

export default OrderPage