import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { ValidateProfileErrors } from '../consts/consts'
import { profileActions, profileReducer } from './profileSlice'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { type ProfileSchema } from '../types/editableProfileCardSchema'

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS
}

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true)))
      .toEqual({ readonly: true })
  })
  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: 'test' }
    }

    const expected: DeepPartial<ProfileSchema> = {
      readonly: true,
      validateErrors: undefined,
      form: data,
      data
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit()))
      .toEqual(expected)
  })
  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: data }

    const expected: DeepPartial<ProfileSchema> = {
      form: { ...data, first: 'Abu', lastname: 'Babu' }
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          first: 'Abu',
          lastname: 'Babu'
        })))
      .toEqual(expected)
  })
  test('test update service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileErrors.SERVER_ERROR] }

    const expected: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: undefined
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending))
      .toEqual(expected)
  })
  test('test update service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { data: {}, form: {} }

    const expected: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      data,
      form: data
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')))
      .toEqual(expected)
  })
})
