import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi, fetchApiByFilter, fetchBrandsByApi, fetchCatagorysByApi, fetchProductsById } from './productApi';

// export const changePage = (pageNumber) => ({
//   type: 'CHANGE_PAGE',
//   payload: pageNumber
// });

// fetch all the product
export const FetchAllProducts = createAsyncThunk(
  'product/fetchApi',
  async () => {
    const responce = await fetchApi()
    // console.log(responce)
    return responce.data

  }
)

//  catagory
export const fetchCatagory = createAsyncThunk(
  "catagory/fetchCatagorysByApi",
  async () => {
    const responce = await fetchCatagorysByApi()
    return responce.data
  }
)

// brands
export const fetchBrands = createAsyncThunk(
  "catagory/fetchBrandsByApi",
  async () => {
    const responce = await fetchBrandsByApi()
    return responce.data
  }
)

//  my filter
export const FetchProductsByFilter = createAsyncThunk(
  'product/FetchProductsByFilter',
  async (filter, pagination) => {
    const responce = await fetchApiByFilter(filter, pagination)
    return responce.data

  }
)

// :id
export const FetchProductByIdSlice = createAsyncThunk(
  "productDetails/fetchProductsById",
  async (id) => {
    const responce = await fetchProductsById(id)
    return responce.data
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    catagory: [],
    brands: [],
    currentPage: 1,
    productParPage: 10,
    selected: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // .addCase(changePage.fulfilled, (state, action) => {
      //   state.currentPage = action.payload;
      // })
      .addCase(FetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(FetchProductsByFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchProductsByFilter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchCatagory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatagory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catagory = action.payload;
      })
      .addCase(FetchProductByIdSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchProductByIdSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })

  },
});

export const selectProduct = (state) => state.product.products
export const selectCatagory = (state) => state.product.catagory
export const selectBrands = (state) => state.product.brands
export const selectSelected = (state) => state.product.selected
export const selectProductParPage = (state) => state.product.productParPage
export const selectCurrentPage = (state) => state.product.currentPage

export default productSlice.reducer;
