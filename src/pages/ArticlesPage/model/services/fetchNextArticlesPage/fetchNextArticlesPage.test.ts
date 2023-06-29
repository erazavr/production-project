import {
  fetchArticleList
} from '../fetchArticleList/fetchArticleList'
import {
  fetchNextArticlesPage
} from './fetchNextArticlesPage'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

jest.mock('../fetchArticleList/fetchArticleList')

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
  })
  test('fetchArticleList not called when hasMore is false', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()
  })
  test('fetchArticleList not called when isLoading is true', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()
  })
})
