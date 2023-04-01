import React, { type HTMLAttributes, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Card.module.scss'

export enum CardVariant {
  NORMAL = 'normal',
  OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  variant?: CardVariant
}

export const Card = (props: CardProps) => {
  const { className, children, variant = CardVariant.NORMAL, ...rest } = props

  return (
    <div {...rest} className={classNames(cls.Card, {}, [className, cls[variant]])}>
      {children}
    </div>
  )
}
