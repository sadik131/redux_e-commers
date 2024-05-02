import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FetchProductbyIdAsync, createProductAsync, deleteProductByIdAsync, selectBrands, selectCatagory, selectSelected, updateProductByIdAsync } from '../productSlice';

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm()
  const dispatch = useDispatch()
  const brand = useSelector(selectBrands)
  const catagory = useSelector(selectCatagory)
  const product = useSelector(selectSelected)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(FetchProductbyIdAsync(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (product?.product) {
      setValue('title', product?.product.title);
      setValue('description', product?.product.description);
      setValue('price', product?.product.price);
      setValue('discountPercentage', product?.product.discountPercentage);
      setValue('stock', product?.product.stock);
      setValue('brand', product?.product.brand);
      setValue('category', product?.product.category);
      setValue('thumbnail', product?.product.thumbnail);
      setValue('image1', product?.product.images[0]);
      setValue('image2', product?.product.images[1]);
      setValue('image3', product?.product.images[2]);
      setValue('image4', product?.product.images[3]);
    }
  }, [product, setValue]);


  const handleSubmitForm = (data) => {
    const formattedData = {
      title: data.title,
      description: data.description,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: 4.25,
      stock: data.stock,
      brand: data.brand,
      category: data.category,
      thumbnail: data.thumbnail,
      images: [data.image1, data.image2, data.image3, data.image4],
    };
    if (id) {
      dispatch(updateProductByIdAsync({ id: id, formattedData }))
    }
    else {
      dispatch(createProductAsync(formattedData))
    }
    reset()
    navigate("/admin")
  }



  return (
    <form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Product</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    {...register("title", { require: true })}
                    className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                description
              </label>
              <div className="mt-1">
                <textarea
                  {...register("description", { require: true })}
                  name="description"
                  rows={3}
                  className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about Product.</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-10 grid lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="price"
                  name="price"
                  {...register("price", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                discountPercentage
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="discountPercentage"
                  {...register("discountPercentage", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                stock
              </label>
              <div className="mt-1">
                <input
                  {...register("stock", { require: true })}
                  name="stock"
                  type="number"
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <select {...register("brand")}>
                <option>--Choose Brand--</option>
                {brand.brands.map(item => {
                  return <option key={item._id} value={item.value}>{item.lable}</option>
                })}
              </select>
            </div>
            <div>
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <select {...register("category")}>
                <option>--Choose Category--</option>
                {catagory.result.map(item => {
                  return <option key={item._id} value={item.value}>{item.lable}</option>
                })}
              </select>
            </div>

            <div className="col-span-full">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                thumbnail
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="thumbnail"
                  {...register("thumbnail", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Images
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="images1"
                  {...register("image1", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  name="images2"
                  {...register("image2", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  name="images3"
                  {...register("image3", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  name="images4"
                  {...register("image4", { require: true })}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/admin" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        {id && <button
          onClick={()=>dispatch(deleteProductByIdAsync(product.product._id))}
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button>}
      </div>
    </form>
  )
}

export default ProductForm