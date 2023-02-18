import { classNames } from 'shared/lib/classNames/classNames'
import { type ButtonHTMLAttributes, type FC } from 'react'

import cls from './Button.module.scss'

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  square?: boolean
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    variant,
    square,
    size = ButtonSize.M,
    ...rest
  } = props

  const mods: Record<string, boolean> = {
    [cls.square]: square
  }

  return (
    <button
      {...rest}
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size]
      ])}
    >
      {children}
    </button>
  )
}
