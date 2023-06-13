import { getUserAuthData } from 'entities/User'
import { LoginModal } from 'features/AuthByUserName'
import { AvatarDropdown } from 'features/avatarDropdown'
import { NotificationButton } from 'features/notificationButton'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = memo(function Header ({ className }: HeaderProps) {
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  const { t } = useTranslation()

  const showAuthModal = useCallback(() => setIsAuthModal(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModal(false), [])

  if (authData) {
    return (
      <header className={classNames(cls.Header, {}, [className])}>
        <Text className={cls.appName} title={t('Blog')} variant={TextVariant.INVERTED}/>
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
        >
          {t('Создать статью')}
        </AppLink>
        <HStack gap={'16'} className={cls.actions}>
          <NotificationButton/>
          <AvatarDropdown/>
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <Button variant={ButtonVariant.CLEAR} className={cls.links} onClick={showAuthModal}>
        {t('Войти')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={closeAuthModal}/>
    </header>
  )
})
