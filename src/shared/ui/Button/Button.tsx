import { type ButtonHTMLAttributes, memo, type ReactNode } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  OUTLINE_RED = 'outlineRed'
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
  children?: ReactNode
}

export const Button = memo(function Button (props: ButtonProps) {
  const {
    children,
    className,
    variant = ButtonVariant.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    ...rest
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  return (
    <button
      {...rest}
      disabled={disabled}
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size]
      ])}
    >
      {children}
    </button>
  )
})
