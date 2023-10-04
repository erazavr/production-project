import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { type Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<Profile>(`/profile/${profileId}`);
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
