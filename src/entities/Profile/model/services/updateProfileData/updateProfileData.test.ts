import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile'
import { updateProfileData } from './updateProfileData'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS
}

describe('updateProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data
      }
    })

    thunk.api.put.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toBeCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
    expect(result.payload).toEqual(data)
  })
  test('error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data
      }
    })

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual([
      ValidateProfileErrors.SERVER_ERROR
    ])
  })
  test('validate errors', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, first: '' }
      }
    })

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA
    ])
  })
})
