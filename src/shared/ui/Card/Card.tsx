import React, { type HTMLAttributes, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Card.module.scss'

export enum CardVariant {
  NORMAL = 'normal',
  OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  variant?: CardVariant
  max?: boolean
}

export const Card = (props: CardProps) => {
  const { className, children, variant = CardVariant.NORMAL, max, ...rest } = props

  return (
    <div {...rest} className={classNames(cls.Card, { [cls.max]: max }, [className, cls[variant]])}>
      {children}
    </div>
  )
}
