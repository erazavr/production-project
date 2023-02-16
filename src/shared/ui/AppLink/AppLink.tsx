import { classNames } from 'shared/lib/classNames/classNames'
import { type FC } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import cls from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',

  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    children,
    theme = AppLinkTheme.PRIMARY,
    className,
    ...rest
  } = props

  return (
    <Link
      {...rest}
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
    >
      {children}
    </Link>
  )
}
