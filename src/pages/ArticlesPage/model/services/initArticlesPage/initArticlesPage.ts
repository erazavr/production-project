import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type ArticleSortField, type ArticleType } from 'entities/Article'
import { type SortOrder } from 'shared/types'
import { getArticlesPageInited } from '../../selectors/articlesPageSelector'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { articlePageActions } from '../../slices/articlePageSlice'

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const inited = getArticlesPageInited(getState())
    if (!inited) {
      const orderFrommUrl = searchParams.get('order') as SortOrder
      const sortFromUrl = searchParams.get('sort') as ArticleSortField
      const searchFromUrl = searchParams.get('search')
      const typeFromUrl = searchParams.get('type') as ArticleType

      if (orderFrommUrl) {
        dispatch(articlePageActions.setOrder(orderFrommUrl))
      }
      if (sortFromUrl) {
        dispatch(articlePageActions.setSort(sortFromUrl))
      }
      if (searchFromUrl) {
        dispatch(articlePageActions.setSearch(searchFromUrl))
      }
      if (typeFromUrl) {
        dispatch(articlePageActions.setType(typeFromUrl))
      }

      dispatch(articlePageActions.initState())
      dispatch(fetchArticleList({}))
    }
  }
)
