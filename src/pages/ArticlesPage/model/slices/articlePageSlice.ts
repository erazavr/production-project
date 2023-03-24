import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import { type Article, ArticleView } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage'
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList'
import { type ArticlesPageSchema } from '../types/articlesPageSchema'

const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticles = articleAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articleAdapter.getInitialState()
)

export const articlePage = createSlice({
  name: 'articlePage',
  initialState: articleAdapter.getInitialState<ArticlesPageSchema>({
    error: undefined,
    isLoading: false,
    view: ArticleView.GRID,
    ids: [],
    entities: {}
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        articleAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articlePageActions, reducer: articlePageReducer } = articlePage
