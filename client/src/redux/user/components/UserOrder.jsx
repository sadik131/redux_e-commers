import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderbyUserIdAsync, selectUser, selectUserOrder } from '../userSlice';

function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const result = useSelector(selectUserOrder)
  useEffect(() => {
    dispatch(orderbyUserIdAsync(user._id))
  }, [])

  return (
    <>
      {!result.length && <h1 className='text-3xl'>purchase some products</h1>}
      <div>
        {result.map((order, index) => {
          // console.log()
          return <div key={index}>
            <li className="py-6 list-none bg-white p-2 rounded-md my-2">
              {order.product.map((product, index) => {
                return <div key={index} className='flex justify-between '>
                  <div className='flex my-2'>
                    <div key={index} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.items.thumbnail}
                        alt={product.items.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p className='text-sm text-orange-600'>Status : {order.status}</p>
                            <p>{product.items.title}</p>
                            <p className="">total: ${order.totalPrice}</p>
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                  <legend className="text-sm font-semibold  text-gray-900">Address</legend>
                  <p className='font-light text-[15px]'>Shipping address</p>
                  <div className="relative flex items-center">
                    <div className="flex h-6 items-center">

                    </div>
                    <div className='flex justify-between '>
                      <div className="text-sm leading-6">
                        <label className="font-medium text-gray-900">
                          {order.address.fullName}
                        </label>
                        <p className="text-gray-500">address: {order.address.address}</p>
                        <p className="text-gray-500">Email:{order.address.email}</p>
                      </div>
                      <div className='ml-16'>
                        <p className="text-gray-500">City :{order.address.city}</p>
                        <p className="text-gray-500">street:50/2</p>
                        <p className="text-gray-500">zip: {order.address.zip}</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              })}
            </li>
          </div>
        })}
      </div>
    </>
  );
}

export default UserOrder;
