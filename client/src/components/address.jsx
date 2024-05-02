import React from 'react'

function Address({ add, setSelectAddress, selectAddress }) {

    const handleCheckboxChange = () => {
        setSelectAddress(prevState => prevState === add ? null : add);
    }

    return (
        <div className="border-b border-gray-900/10 my-2">
            <div className="mt-1 space-y-10">
                <fieldset>
                    <div className="mt-2 space-y-6">
                        <div className=' border-[2px] border-gray-300'>
                            <div className="relative flex items-center px-2 gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                         onChange={handleCheckboxChange}
                                        id={`address_${add}`}
                                        name={`address_${add}`}
                                        type="checkbox"
                                        checked={selectAddress === add}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className='flex justify-between '>
                                    <div className="text-sm leading-6">
                                        <label className="font-medium text-gray-900">
                                            {add.fullName}
                                        </label>
                                        <p className="text-gray-500">address: {add.address}</p>
                                        <p className="text-gray-500">Email:{add.email}</p>
                                    </div>
                                    <div className='ml-16'>
                                        <p className="text-gray-500">City :{add.city}</p>
                                        <p className="text-gray-500">street:50/2</p>
                                        <p className="text-gray-500">zip: {add.zip}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Address