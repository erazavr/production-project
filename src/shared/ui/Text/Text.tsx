import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Text.module.scss'

export enum TextVariant {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  variant?: TextVariant
  align?: TextAlign
}

export const Text = memo(function Text (props: TextProps) {
  const {
    className,
    text,
    title,
    variant = TextVariant.PRIMARY,
    align = TextAlign.LEFT
  } = props

  return (
    <div className={classNames(cls.Text, {}, [className, cls[variant], cls[align]])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})
