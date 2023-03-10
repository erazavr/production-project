import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileError } from './getProfileError'

describe('getProfileError.test', () => {
  test('Should return profile error text', () => {
    const state: DeepPartial<StateSchema> = { profile: { error: 'error' } }
    expect(getProfileError(state as StateSchema)).toEqual('error')
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})
