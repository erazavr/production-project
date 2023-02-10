import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink'

import cls from './Header.module.scss'

interface NavbarProps {
  className?: string
}

export const Header = ({ className }: NavbarProps) => {
  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <nav className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/"
          className={cls.mainLink}>Главная</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">О сайте</AppLink>
      </nav>
    </header>
  )
}
