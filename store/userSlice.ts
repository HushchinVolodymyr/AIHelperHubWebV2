import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUserState from "@/interfaces/iUserState";

const initialState: IUserState = {
  id: null,
  username: null,
  email: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{id: string, username: string,  email: string}>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = null
      state.username = null
      state.email = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer