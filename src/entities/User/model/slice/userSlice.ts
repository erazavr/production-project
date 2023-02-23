import { createSlice } from '@reduxjs/toolkit'
import { type UserSchema } from 'entities/User/model/types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {}
})

export const { actions: userActions, reducer: userReducer } = userSlice
