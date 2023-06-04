import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import getMenu from '../../firebaseServices/menu/menuFirebase'

export const fetchMenu = createAsyncThunk('menu/loadItems', async (sellerId: string) => {
  const menuItems = await getMenu(sellerId)
  return menuItems
})

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const {addItem, removeItem, updateItem} = menuSlice.actions

export default menuSlice.reducer
