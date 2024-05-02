import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAddressAsync, selectUser, updateUseraddrssAsync } from '../userSlice';

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const [editAddress, setEditAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');


  const handelDelete = (user, address) => {
    dispatch(deleteUserAddressAsync(user, address))
  }

  const setAddress = (id) => {
    setEditAddress(id);
    const addressToUpdate = user.address.find(address => address._id === id)
    setFormData(addressToUpdate);
    setPaymentMethod(addressToUpdate.payment);
  }

  const handleEditCancel = () => {
    setEditAddress(null);
    setFormData({
      fullName: '',
      email: '',
      country: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    });
    setPaymentMethod('');

  }

  const handleInputChange = (e) => {
    if (e.target.name === 'payment') {
      setPaymentMethod(e.target.value);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedAddress = {
      _id: editAddress,
      fullName: formData.fullName,
      email: formData.email,
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      payment: paymentMethod
    };

    dispatch(updateUseraddrssAsync({ user: user._id, editAddress, updatedAddress }));
    // handleEditCancel();
  }

  return (
    <>
      <div className='bg-white p-4'>
        <h1 className='text-2xl my-2 font-semibold'>Name: {user.name}</h1>
        <p className='text-amber-900 font-medium'>email: {user.email}</p>
        {editAddress && (
          <form onSubmit={handleFormSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md  p-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border p-1"
                >
                  <option>Dhaka</option>
                  <option>Gaibandha</option>
                  <option>Rongpur</option>
                  <option>Bogura</option>
                </select>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={formData.zip || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                />
              </div>
              <div className="sm:col-span-2">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Payment</legend>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="cash"
                        name="payment"
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 border p-1"
                      />
                      <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="online"
                        name="payment"
                        type="radio"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 border p-1"
                      />
                      <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-700">
                        Online
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="button" onClick={handleEditCancel} className="ml-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </form>

        )}
        <div className='w-full h-[1px] my-2 bg-gray-300' />
        <h2>Your Addresses:</h2>
        {user.address.map(address => {
          return <div key={address._id} className='border flex justify-between my-2 p-2 border-gray-500'>
            <div className='flex flex-col gap-2'>
              <span>Name: {address.fullName}</span>
              <span>Email: {address.email}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span>Country: {address.country}</span>
              <span>Address: {address.address}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span>State: {address.state}</span>
              <span>Zip: {address.zip}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <button
                onClick={() => setAddress(address._id)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => handelDelete({ user: user._id, addressId: address._id })}
                type="button"
                className="font-medium text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        })}
      </div>
    </>
  );
}

export default UserProfile;
