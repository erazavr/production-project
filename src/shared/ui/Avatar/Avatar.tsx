import { type CSSProperties, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

const NO_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'

export const Avatar = (props: AvatarProps) => {
  const { className, src, size, alt } = props

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100
  }), [size])

  return (
    <img src={src || NO_IMAGE_URL} style={styles} className={classNames(cls.Avatar, {}, [className])} alt={alt} />
  )
}
