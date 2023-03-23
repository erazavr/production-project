import React, { type HTMLAttributes, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const Card = (props: CardProps) => {
  const { className, children, ...rest } = props

  return (
    <div {...rest} className={classNames(cls.Card, {}, [className])}>
      {children}
    </div>
  )
}
