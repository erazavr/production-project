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

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  variant?: TextVariant
  align?: TextAlign
  size?: TextSize
}

export const Text = memo(function Text (props: TextProps) {
  const {
    className,
    text,
    title,
    variant = TextVariant.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M
  } = props

  const additional: string[] = [className, cls[variant], cls[align], cls[size]]

  return (
    <div className={classNames(cls.Text, {}, additional)}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})
