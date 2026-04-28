import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllOrders, updateOrderStatusAPI } from './orderAPI'

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await fetchAllOrders()
  return response
})

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, status }) => {
  const response = await updateOrderStatusAPI({ id, status })
  return response
})

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => { state.isLoading = true })
      .addCase(getOrders.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload })
      .addCase(getOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(o => o._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export default orderSlice.reducer

export const selectAllOrders = (state) => state.orders.items
export const selectOrdersLoading = (state) => state.orders.isLoading