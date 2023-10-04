import { memo } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',

  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = memo(function AppLink(props: AppLinkProps) {
  const {
    to,
    children,
    theme = AppLinkTheme.PRIMARY,
    className,
    ...rest
  } = props;

  return (
    <Link
      {...rest}
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
    >
      {children}
    </Link>
  );
});
