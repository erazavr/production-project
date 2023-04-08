import { getUserAuthData, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUserName'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Text, TextVariant } from 'shared/ui/Text/Text'

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
        <Text className={cls.appName} title={t('Blog')} variant={TextVariant.INVERTED}/>
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
        >
          {t('Создать статью')}
        </AppLink>
        <Dropdown
          direction={'bottom left'}
          className={cls.links}
          items={
            [
              {
                content: t('Профиль'),
                href: RoutePath.profile + authData.id
              },
              {
                content: t('Выйти'),
                onClick: onLogout
              }
            ]
          } trigger={<Avatar size={30} src={authData.avatar}/>}/>
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
