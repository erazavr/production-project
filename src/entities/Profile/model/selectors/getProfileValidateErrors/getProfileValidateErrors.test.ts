import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileValidateErrors } from './getProfileValidateErrors'
import { ValidateProfileErrors } from '../../types/profile'

describe('getProfileValidateErrors.test', () => {
  test('Should return profile validate errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileErrors.SERVER_ERROR,
          ValidateProfileErrors.INCORRECT_AGE
        ]
      }
    }
    expect(getProfileValidateErrors(state as StateSchema))
      .toEqual([ValidateProfileErrors.SERVER_ERROR, ValidateProfileErrors.INCORRECT_AGE])
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
