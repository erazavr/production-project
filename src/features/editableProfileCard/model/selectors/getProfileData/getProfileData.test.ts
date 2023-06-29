import { type StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileData } from './getProfileData'

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS
}

describe('getProfileData.test', () => {
  test('Should return profile data', () => {
    const state: DeepPartial<StateSchema> = { profile: { data } }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
