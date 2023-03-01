import { getUserAuthData, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUserName'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = memo(function Header ({ className }: HeaderProps) {
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const showAuthModal = useCallback(() => setIsAuthModal(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModal(false), [])

  const onLogout = useCallback(() => dispatch(userActions.logout()), [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.Header, {}, [className])}>
        <Button variant={ButtonVariant.CLEAR} className={cls.links} onClick={onLogout}>
          {t('Выйти')}
        </Button>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <Button variant={ButtonVariant.CLEAR} className={cls.links} onClick={showAuthModal}>
        {t('Войти')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
    </header>
  )
})
