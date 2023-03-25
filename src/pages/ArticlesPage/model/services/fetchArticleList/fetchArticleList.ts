import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Article } from 'entities/Article'
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlesPageSelector'

interface FetchArticleListProps {
  page?: number
}

export const fetchArticleList = createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>(
  'articlesPage/fetchArticleList',
  async (props, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI

    const { page = 1 } = props

    const limit = getArticlesPageLimit(getState())

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page
        }
      })
      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
