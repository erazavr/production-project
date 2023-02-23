import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input autoFocus placeholder={t('Имя пользователя')} className={cls.input}/>
      <Input type='password' placeholder={t('Пароль')} className={cls.input}/>
      <Button variant={ButtonVariant.OUTLINE} className={cls.loginBtn} >
        {t('Войти')}
      </Button>
    </div>
  )
}
