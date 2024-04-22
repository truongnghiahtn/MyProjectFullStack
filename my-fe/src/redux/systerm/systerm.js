import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const systerm = createSlice({
  name: 'systerm',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = systerm.actions

export default systerm.reducer