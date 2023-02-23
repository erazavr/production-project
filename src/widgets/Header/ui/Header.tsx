import { LoginModal } from 'features/AuthByUserName'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false)

  const { t } = useTranslation()

  const showAuthModal = useCallback(() => setIsAuthModal(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModal(false), [])

  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <Button variant={ButtonVariant.CLEAR} className={cls.links} onClick={showAuthModal}>
        {t('Войти')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
    </header>
  )
}
