import { type Profile } from 'entities/Profile'
import { type ValidateProfileErrors } from '../consts/consts'

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileErrors[]
}
