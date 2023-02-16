import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const { t } = useTranslation()
  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <nav className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/"
          className={cls.mainLink}>{t('Главная')}</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">{t('О сайте')}</AppLink>
      </nav>
    </header>
  )
}
