import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
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
}

const initReducers: ReducersList = { loginForm: loginReducer }

const LoginForm = memo(function LoginForm (props: LoginFormProps) {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
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

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({
      username,
      password
    }))
  }, [dispatch, password, username])

  return (
    <DynamicModuleLoader reducers={initReducers} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')}/>
        {error && (
          <Text variant={TextVariant.ERROR} text={t(error)}/>
        )}
        <Input
          name='username'
          autoFocus
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          name='password'
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
          onClick={onLoginClick}
        >
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default LoginForm
