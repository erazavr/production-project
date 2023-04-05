import { type LoginFormProps } from './LoginForm'
import { type FC, lazy } from 'react'

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => await import('./LoginForm'))
