import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct, deleteProductById, fetchApi, fetchApiByFilter, fetchBrandsByApi, fetchCatagorysByApi, fetchProductsById, updateProductById } from './productApi';


// fetch all the product
export const FetchAllProducts = createAsyncThunk(
  'product/fetchApi',
  async () => {
    const responce = await fetchApi()
    return responce.data

  }
)
// create a new product
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (data) => {
    const responce = await createProduct(data)
    return responce.data

  }
)
// update product by id
export const updateProductByIdAsync = createAsyncThunk(
  'product/updateProductById',
  async (data) => {
    const responce = await updateProductById(data)
    return responce.data

  }
)
// fetch productby id
export const FetchProductbyIdAsync = createAsyncThunk(
  'product/FetchAllProductbyId',
  async (id) => {
    const responce = await fetchProductsById(id)
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
export const fetchProductsByFilter = createAsyncThunk(
  'product/fetchProductsByFilter',
  async (filter, { getState }) => {
    const state = getState().product;
    const response = await fetchApiByFilter(filter, state.pagination);
    return response.data;
  }
)
export const deleteProductByIdAsync = createAsyncThunk(
  'product/deleteProductById',
  async (id) => {
    const response = await deleteProductById(id);
    return response.data;
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
    selected: null,
    filters: {}
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.product;
      })
      .addCase(FetchProductsByFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchProductsByFilter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
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
      .addCase(FetchProductbyIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchProductbyIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(deleteProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.products = state.products.filter(product => product.id !== action.payload.id);
      })

  },
});

export const { setFilters } = productSlice.actions;


export const selectProduct = (state) => state.product.products
export const selectCatagory = (state) => state.product.catagory
export const selectBrands = (state) => state.product.brands
export const selectSelected = (state) => state.product.selected
export const selectProductParPage = (state) => state.product.productParPage
export const selectCurrentPage = (state) => state.product.currentPage

export default productSlice.reducer;
