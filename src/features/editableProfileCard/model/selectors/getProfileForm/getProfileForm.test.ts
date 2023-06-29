import { type StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileForm } from './getProfileForm'

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS
}

describe('getProfileForm.test', () => {
  test('Should return profile form data', () => {
    const state: DeepPartial<StateSchema> = { profile: { form: data } }
    expect(getProfileForm(state as StateSchema)).toEqual(data)
  })

  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})
