import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Article } from '../types/article';
import { fetchArticleById } from '../services/fetchArticleById';
import { type ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  error: undefined,
  isLoading: false,
  data: undefined,
};

export const articleDetails = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticleById.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  actions: articleDetailsActions,
  reducer: articleDetailsReducer,
} = articleDetails;
