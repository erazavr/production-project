import { classNames } from '@/shared/lib/classNames/classNames'
import { type ButtonHTMLAttributes, type FC } from 'react'

import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, theme, ...rest } = props
  return (
    <button
      {...rest}
      className ={ classNames(cls.Button, {}, [className, cls[theme]])}
    >
      {children}
    </button>
  )
}
