import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllUsers, deleteUserAPI, makeAdminAPI } from './userAPI'

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetchAllUsers()
  return response
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await deleteUserAPI(id)
  return id
})

export const makeAdmin = createAsyncThunk('users/makeAdmin', async (id) => {
  const response = await makeAdminAPI(id)
  return response
})

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => { state.isLoading = true })
      .addCase(getUsers.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload })
      .addCase(getUsers.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u._id !== action.payload)
      })
      .addCase(makeAdmin.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export default userSlice.reducer

export const selectAllUsers = (state) => state.users.items
export const selectUsersLoading = (state) => state.users.isLoading