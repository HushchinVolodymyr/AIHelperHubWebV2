import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IAssistant from "@/interfaces/iAssistant";

const initialState: IAssistant = {
  id: null,
  name: null,
  description: null,
}

export const assistantSlice = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    setAssistant: (state, action: PayloadAction<{id: number,  name: string, description: string}>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.description = action.payload.description
    },
    unSetAssistant: (state) => {
      state.id = null
      state.name = null
      state.description = null
    }
  },
})

export const { setAssistant, unSetAssistant } = assistantSlice.actions

export default assistantSlice.reducer