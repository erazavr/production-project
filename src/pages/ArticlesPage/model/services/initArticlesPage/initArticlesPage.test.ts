import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchArticleList/fetchArticleList');

describe('initArticlesPage.test.ts', () => {
  test('if inited', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        _inited: true,
      },
    });
    await thunk.callThunk(new URLSearchParams());
    expect(thunk.dispatch).toBeCalledTimes(2);
  });
  test('if not inited', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        _inited: false,
      },
    });
    await thunk.callThunk(new URLSearchParams());
    expect(thunk.dispatch).toBeCalledTimes(4);
  });
});
