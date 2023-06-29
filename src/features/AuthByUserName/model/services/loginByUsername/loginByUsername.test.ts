import { userActions } from '@/entities/User'
import { loginByUsername } from './loginByUsername'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

describe('loginByUsername.test', () => {
  // let dispatch: Dispatch
  // let getState: () => StateSchema
  //
  // beforeEach(() => {
  //   dispatch = jest.fn()
  //   getState = jest.fn()
  // })

  // test('success login', async () => {
  //   const userValue = { username: 'admin', id: '1' }
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))
  //   const action = loginByUsername({ username: 'admin', password: '123 ' })
  //   const result = await action(dispatch, getState, undefined)
  //
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setUserData(userValue))
  //   expect(dispatch).toHaveBeenCalledTimes(3)
  //   expect(mockedAxios.post).toBeCalled()
  //   expect(result.meta.requestStatus).toEqual('fulfilled')
  //   expect(result.payload).toEqual(userValue)
  // })
  // test('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
  //   const action = loginByUsername({ username: 'admin', password: '123 ' })
  //   const result = await action(dispatch, getState, undefined)
  //
  //   expect(mockedAxios.post).toBeCalled()
  //   expect(dispatch).toHaveBeenCalledTimes(2)
  //   expect(result.meta.requestStatus).toEqual('rejected')
  //   expect(result.payload).toEqual('Вы ввели неверный логин или пароль')
  // })

  test('success login', async () => {
    const userValue = {
      username: 'admin',
      id: '1'
    }

    const thunk = new TestAsyncThunk(loginByUsername)

    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
    const result = await thunk.callThunk({
      username: 'admin',
      password: '123 '
    })

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toBeCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
    expect(result.payload).toEqual(userValue)
  })
  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk({
      username: 'admin',
      password: '123 '
    })

    expect(thunk.api.post).toBeCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
