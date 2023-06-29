import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { type Profile } from '@/entities/Profile'
import { $api } from '@/shared/api/api'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCard } from './EditableProfileCard'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin213'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  beforeEach(() => {
    componentRender(<EditableProfileCard id="1" />, options)
  })
  test('Режим рид онли должен переключиться', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileHeader.CancelButton')).toBeInTheDocument()
  })

  test('При отмене значения должны обнуляться', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
  })

  test('Должна появиться ошибка', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

    await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'))

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')

    await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
