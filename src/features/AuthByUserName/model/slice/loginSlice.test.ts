import { loginReducer, type LoginSchema } from 'features/AuthByUserName'
import { loginActions } from 'features/AuthByUserName/model/slice/loginSlice'

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: 'admin'
    }
    expect(
      loginReducer(
        state as LoginSchema,
        loginActions.setUsername('test')))
      .toEqual({ username: 'test' })
  })
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '123'
    }
    expect(
      loginReducer(
        state as LoginSchema,
        loginActions.setPassword('123123')))
      .toEqual({ password: '123123' })
  })
})
