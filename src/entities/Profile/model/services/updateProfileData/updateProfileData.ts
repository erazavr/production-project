import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { type Profile } from '../../types/profile'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI
    const formData = getProfileForm(getState())
    try {
      const response = await extra.api.put<Profile>('/profile', formData)
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
