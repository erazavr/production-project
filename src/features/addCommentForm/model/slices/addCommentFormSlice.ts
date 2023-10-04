import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AddCommentFormSchema } from '../types/addCommentFormSchema';

const initialState: AddCommentFormSchema = {
  error: undefined,
  text: '',
};

export const addCommentForm = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const {
  actions: addCommentFormActions,
  reducer: addCommentFormReducer,
} = addCommentForm;
