import React, { useState } from 'react'
import Cart from '../redux/cart/Cart'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn, userAddressAsync } from '../redux/auth/authSlice';

function CheckOut() {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedIn)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    return (
        <>
            <div>
                <div className='flex'>
                    <form onSubmit={handleSubmit(data => dispatch(userAddressAsync({ ...user, address: [...user.address, data] })))}>
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
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
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
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Address</legend>
                                        <p className='font-light text-[15px]'>Chose on existing address</p>
                                        <div className="mt-2 space-y-6">

                                            <div className=' border-[2px] border-gray-300'>
                                                <div className="relative flex items-center px-2 gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="candidates"
                                                            name="candidates"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className='flex justify-between '>
                                                        <div className="text-sm leading-6">
                                                            <label className="font-medium text-gray-900">
                                                                john
                                                            </label>
                                                            <p className="text-gray-500">address: Thanapara Gaibandha</p>
                                                            <p className="text-gray-500">Email:salatusSadik@gmail.com</p>
                                                        </div>
                                                        <div className='ml-16'>
                                                            <p className="text-gray-500">City :Gaibandha</p>
                                                            <p className="text-gray-500">street:50/2</p>
                                                            <p className="text-gray-500">zip: 5250</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </form>

                    <Cart></Cart>
                </div>
            </div >

        </>
    )
}

export default CheckOut