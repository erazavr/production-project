import { type StateSchema } from '@/app/providers/StoreProvider'
import { getProfileReadonly } from './getProfileReadonly'

describe('getProfileReadonly.test', () => {
  test('Should return profile readonly state', () => {
    const state: DeepPartial<StateSchema> = { profile: { readonly: true } }
    expect(getProfileReadonly(state as StateSchema)).toEqual(true)
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined)
  })
})
