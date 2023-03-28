import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type UISchema } from 'features/UI'

const initialState: UISchema = {
  scroll: {}
}

export const UI = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
      state.scroll[payload.path] = payload.position
    }
  }
})

export const { actions: UIActions, reducer: UIReducer } = UI
