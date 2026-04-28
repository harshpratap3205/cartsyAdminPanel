import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './productAPI'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetchProducts()
  return response
})

export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
  const response = await createProduct(formData)
  return response
})

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, formData }) => {
  const response = await updateProduct({ id, formData })
  return response
})

export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
  await deleteProduct(id)
  return id
})

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => { state.isLoading = true })
      .addCase(getProducts.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload })
      .addCase(getProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload) })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload)
      })
  },
})

export default productSlice.reducer

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectProductsLoading = (state) => state.products.isLoading