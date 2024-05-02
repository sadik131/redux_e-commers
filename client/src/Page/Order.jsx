import React from 'react'
import Navbar from '../components/navbar/Navbar'
import OrderCom from '../redux/order/Order'


function Order() {
  return (
    <Navbar>
      <OrderCom></OrderCom>
    </Navbar>
  )
}

export default Order