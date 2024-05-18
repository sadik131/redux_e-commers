import React, { useEffect, useState } from 'react'
import Edit from '../../../assets/icon/Edit'
import Visite from '../../../assets/icon/Visite'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderAsync, selectOrder, updateStatusAsync } from '../../order/orderSlice'

function AdminOrder() {
    const dispatch = useDispatch()
    const order = useSelector(selectOrder)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        dispatch(fetchAllOrderAsync())
    }, [])

    const handelEdit = (id) => {
        setEdit((prevId) => (prevId === id ? null : id));
    }
    const handleStatusChange = (e) => {
        dispatch(updateStatusAsync({ id: edit, status: e.target.value }))
        setEdit(null)
    }

    

    return (
        <section className="container px-4 mx-auto">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <div className="flex items-center gap-x-2">
                                                    <span>ORDER#</span>
                                                </div>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            ITEMS
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            TOTAL AMOUNT
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            SHIPPING ADDRESS
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            STATUS
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            ACTIONS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {order.map((order, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="flex flex-col items-center gap-x-3">
                                                    {order.product.map(item => (
                                                        <span key={item._id}>{item._id}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div>
                                                    {order.product.map((item, index) => (
                                                        <img key={index} className='h-10 w-10' src={item.items.thumbnail} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    ${order.totalPrice}
                                                    {order.product.map((item, index) => (
                                                        <h1 key={index} className=''>#{item.quantity}</h1>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div>{order.address.fullName}</div>
                                                <div>{order.address.email}</div>
                                                <div>{order.address.country}</div>
                                                <div>{order.address.city}</div>
                                                <div>{order.address.state}</div>
                                                <div>{order.address.zip}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {edit === order._id ?
                                                    <select onChange={handleStatusChange} className='border border-gray-400 p-1'>
                                                        <option value="pending">pending</option>
                                                        <option value="dispatch">dispatch</option>
                                                        <option value="cancel">cancel</option>
                                                    </select>
                                                    :
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                        <h2 className="text-sm font-normal">{order.status}</h2>
                                                    </div>}
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 dark:bg-gray-800">
                                                    <span onClick={() => handelEdit(order._id)} ><Edit className='h-5 w-5 cursor-pointer'></Edit></span>
                                                    <Visite className='h-5 w-5 cursor-pointer'></Visite>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>

    )
}

export default AdminOrder