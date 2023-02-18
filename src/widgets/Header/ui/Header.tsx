import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <nav className={cls.links}>
        /
      </nav>
    </header>
  )
}
