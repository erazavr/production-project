import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPageInited } from '../../selectors/articlesPageSelector'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { articlePageActions } from '../../slices/articlePageSlice'

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (props, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const inited = getArticlesPageInited(getState())
    if (!inited) {
      dispatch(articlePageActions.initState())
      dispatch(fetchArticleList({
        page: 1
      }))
    }
  }
)
