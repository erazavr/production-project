import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { type Profile } from 'entities/Profile'
import { ValidateProfileErrors } from '../../consts/consts'
import { validateProfileData } from './validateProfileData'

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS
}

describe('validateProfileData.test', () => {
  test('Should return No data', async () => {
    expect(validateProfileData(undefined)).toEqual([ValidateProfileErrors.NO_DATA])
  })
  test('Should return INCORRECT_USER_DATA INCORRECT_AGE INCORRECT_COUNTRY', async () => {
    const profile: Profile = {
      ...data,
      first: '',
      lastname: '',
      age: undefined,
      country: undefined
    }

    const expected = [
      ValidateProfileErrors.INCORRECT_USER_DATA,
      ValidateProfileErrors.INCORRECT_AGE,
      ValidateProfileErrors.INCORRECT_COUNTRY
    ]

    expect(validateProfileData(profile)).toEqual(expected)
  })
  test('Should return INCORRECT_USER_DATA', async () => {
    const profile: Profile = { ...data, first: '', lastname: '' }

    const expected = [ValidateProfileErrors.INCORRECT_USER_DATA]

    expect(validateProfileData(profile)).toEqual(expected)
  })
  test('Should return INCORRECT_AGE', async () => {
    const profile: Profile = { ...data, age: undefined }

    const expected = [ValidateProfileErrors.INCORRECT_AGE]

    expect(validateProfileData(profile)).toEqual(expected)
  })
  test('Should return INCORRECT_COUNTRY', async () => {
    const profile: Profile = { ...data, country: undefined }

    const expected = [ValidateProfileErrors.INCORRECT_COUNTRY]

    expect(validateProfileData(profile)).toEqual(expected)
  })
})
