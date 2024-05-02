import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserAsync } from '../redux/user/userSlice';
import Address from '../components/address';
import { selectedCart, updateCartAsync } from '../redux/cart/cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { createOrderAsync, selectCurrentOrder } from '../redux/order/orderSlice';

function CheckOut() {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const { order } = useSelector(selectCurrentOrder) || {};
    const { result } = useSelector(selectedCart)
    const [selectAddress, setSelectAddress] = useState(null)

    // calculate price
    useEffect(() => {
        const initialQuantities = result.reduce((quantities, product) => {
            quantities[product._id] = product.quantity;
            return quantities;
        }, {});
        setQuantities(initialQuantities);
    }, [result]);

    const handleQuantityChange = (e, productId) => {
        const newQuantity = parseInt(e.target.value);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }))
        dispatch(updateCartAsync({ quantity: newQuantity, productId }));
    }

    // calculate price
    const totalPrice = result?.reduce((total, product) => {
        const quantity = quantities[product._id] || 1;
        return total + (parseFloat(product.items.price) * quantity);
    }, 0).toFixed(0);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handelFromSubmit = (data) => {
        const info = {
            userId: user._id,
            data
        }
        dispatch(updateUserAsync(info))
    }
    const confirmCheckOut = () => {
        if (selectAddress && paymentMethod) {
            const data = {
                totalPrice,
                userId: user._id,
                product: result,
                address: selectAddress,
                status: "pending",
                paymentMethod
            }
            dispatch(createOrderAsync(data))

        } else {
            alert("all fild required")
        }
    }
    return (
        <>
            {order && <Navigate to={`/order/${order._id}`}></Navigate>}
            <div>
                <div className='flex'>
                    <form onSubmit={handleSubmit(data => handelFromSubmit(data))}>
                        <div className="px-14 mt-5">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Check out Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("fullName")}
                                            id="first-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register("email")}
                                            type="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            {...register("country")}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>Dhaka</option>
                                            <option>Gaibandha</option>
                                            <option>Rongpur</option>
                                            <option>Bogura</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("address")}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("city")}
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("state")}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("zip")}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="cash-everything"
                                            name="cash-notifications"
                                            type="radio"
                                            {...register("payment")}
                                            value="cash"
                                            checked={paymentMethod === "cash"}
                                            onChange={handlePaymentChange}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="cash-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            cash
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            {...register("payment")}
                                            type="radio"
                                            value="online"
                                            checked={paymentMethod === 'online'}
                                            onChange={handlePaymentChange}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="online-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            online
                                        </label>
                                    </div>

                                </div>
                            </fieldset>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                            {/* map */}
                            <legend className="text-sm font-semibold  text-gray-900">Address</legend>
                            <p className='font-light text-[15px]'>Chose on existing address</p>
                            {user?.address?.map(add => <Address key={add._id} selectAddress={selectAddress} setSelectAddress={setSelectAddress} add={add}></Address>)}

                        </div>
                    </form>

                    <div className='mx-auto max-w-xl'>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {result.map((product) => {
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
                                                        <select value={product.quantity} onChange={(e) => handleQuantityChange(e, product._id)}>
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
                                <button
                                    onClick={confirmCheckOut}
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Order
                                </button>
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
            </div >
        </>
    )
}

export default CheckOut