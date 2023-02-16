import { classNames } from 'shared/lib/classNames/classNames'
import { type ButtonHTMLAttributes, type FC } from 'react'

import cls from './Button.module.scss'

export enum VariantButton {
  CLEAR = 'clear',
  OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: VariantButton
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, variant, ...rest } = props
  return (
    <button
      {...rest}
      className={classNames(cls.Button, {}, [className, cls[variant]])}
    >
      {children}
    </button>
  )
}
