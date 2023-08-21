import { Sceleton } from '../Sceleton'
import { Icon } from '../Icon'
import { AppImage } from '../AppImage'
import { type CSSProperties, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import UserIcon from '../../assets/icons/user-filled.svg'

import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
  fallbackInverted?: boolean
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size, alt, fallbackInverted } = props

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100
  }), [size])

  const fallback = <Sceleton width={size} height={size} borderRadius={'50%'}/>
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} inverted={fallbackInverted}/>

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
      alt={alt}
    />
  )
}
