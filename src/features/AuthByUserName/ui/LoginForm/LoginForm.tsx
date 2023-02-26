import { getLoginState } from 'features/AuthByUserName/model/selectors/getLoginState/getLoginState'
import { type FormEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions } from '../../model/slice/loginSlice'

import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(function LoginForm (props: LoginFormProps) {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    username,
    password,
    isLoading,
    error
  } = useSelector(getLoginState)

  const onChangeUsername = useCallback((val: string) => {
    dispatch(loginActions.setUsername(val))
  }, [dispatch])

  const onChangePassword = useCallback((val: string) => {
    dispatch(loginActions.setPassword(val))
  }, [dispatch])

  const onLoginClick = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginByUsername({
      username,
      password
    }))
  }, [dispatch, password, username])

  return (
    <form onSubmit={onLoginClick} className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')}/>
      {error && (
        <Text variant={TextVariant.ERROR} text={t(error)}/>
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
  )
})
