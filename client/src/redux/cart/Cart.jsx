import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { removeItemAsync, selectedCart, updateCartAsync } from './cartSlice';

function Cart() {
  const { result } = useSelector(selectedCart);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities from result
    const initialQuantities = result.reduce((quantities, product) => {
      quantities[product._id] = product.quantity;
      return quantities;
    }, {});
    setQuantities(initialQuantities);
  }, [result]);

  // quantity
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));

    // Dispatch updateCartAsync with the new quantity
    dispatch(updateCartAsync({ quantity: newQuantity, productId }));
  };

  const totalPrice = result?.reduce((total, product) => {
    const quantity = quantities[product._id] || 1;
    return total + (parseFloat(product.items.price) * quantity);
  }, 0).toFixed(0);


  if (!result.length) {
    return <Navigate to="/"></Navigate>
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className='mx-auto max-w-xl'>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {result.map((product) => {
                  console.log(product)
                  const { items } = product;
                  return <li key={product._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={items?.thumbnail}
                        alt={items?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{items?.title}</p>
                          </h3>
                          <p className="ml-4">${items?.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty
                          <select value={quantities[product._id] || 1} onChange={(e) => handleQuantityChange(e, product._id)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select></p>

                        <div className="flex">
                          <button
                            onClick={() => dispatch(removeItemAsync(product._id))}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                })}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <Link to={"/"}>
                or{' '}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default Cart;
