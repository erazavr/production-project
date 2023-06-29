import { type CSSProperties, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Sceleton.module.scss'

interface SceletonProps {
  className?: string
  height?: string | number
  width?: string | number
  borderRadius?: string
}

export const Sceleton = memo(function Sceleton (props: SceletonProps) {
  const {
    borderRadius,
    width,
    height,
    className
  } = props

  const styles: CSSProperties = {
    width,
    height,
    borderRadius
  }

  return (
    <div style={styles} className={classNames(cls.Sceleton, {}, [className])}/>
  )
})
