import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type User, userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI
    try {
      const response = await extra.api.post<User>('/login', data)
      if (!response.data) {
        throw new Error()
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setUserData(response.data))
      console.log(response.data)

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
