import { type FormEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUserName'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'

import cls from './LoginForm.module.scss'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initReducers: ReducersList = { loginForm: loginReducer }

const LoginForm = memo(function LoginForm (props: LoginFormProps) {
  const { className, onSuccess } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const error = useSelector(getLoginError)
  const isLoading = useSelector(getLoginIsLoading)

  const onChangeUsername = useCallback((val: string) => {
    dispatch(loginActions.setUsername(val))
  }, [dispatch])

  const onChangePassword = useCallback((val: string) => {
    dispatch(loginActions.setPassword(val))
  }, [dispatch])

  const onLoginClick = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await dispatch(loginByUsername({
      username,
      password
    }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [dispatch, onSuccess, password, username])

  return (
    <DynamicModuleLoader reducers={initReducers}>
      <form onSubmit={onLoginClick} className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')}/>
        {error && (
          <Text variant={TextVariant.ERROR} text={t('Вы ввели неверный логин или пароль')}/>
        )}
        <Input
          autoFocus
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type="password"
          placeholder={t('Пароль')}
          className={cls.input}
          onChange={onChangePassword}
          value={password}
        />
        <Button
          variant={ButtonVariant.OUTLINE}
          className={cls.loginBtn}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </form>
    </DynamicModuleLoader>
  )
})

export default LoginForm
