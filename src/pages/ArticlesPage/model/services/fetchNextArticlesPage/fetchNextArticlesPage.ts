import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum
} from '../../selectors/articlesPageSelector'
import {
  fetchArticleList
} from '../fetchArticleList/fetchArticleList'
import { articlePageActions } from '../../slices/articlePageSlice'

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (props, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageNum(getState())
    const isLoading = getArticlesPageIsLoading(getState())

    if (hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1))
      dispatch(fetchArticleList({
        page: page + 1
      }))
    }
  }
)
