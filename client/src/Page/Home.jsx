import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Product from '../redux/products/components/Product'

function Home() {
  return (
    <>
      <Navbar>
        <Product></Product>
      </Navbar>
    </>
  )
}

export default Home