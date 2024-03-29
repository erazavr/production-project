import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { type StateSchema } from '@/app/providers/StoreProvider';
import { type Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { type ArticleDetailsRecommendationSchema } from '../types/articleDetailsRecommendationSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: article => article.id,
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    state =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState(),
  );

const articleDetailsPageRecommendationSlice = createSlice({
  name: 'articleDetailsPageRecommendationSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
      error: undefined,
      isLoading: false,
      ids: [],
      entities: {},
    }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticleRecommendations.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationSliceReducer } =
  articleDetailsPageRecommendationSlice;
