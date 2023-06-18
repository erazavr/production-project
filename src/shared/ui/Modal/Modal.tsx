import React, { type ReactNode } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 200

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props

  const { close, isClosing, isMounted } = useModal({ animationDelay: ANIMATION_DELAY, isOpen, onClose })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) return null

  return (
    <Portal>
      <div data-testid='modal' className={classNames(cls.Modal, mods, [className, 'app_modal'])}>
        <Overlay onClick={close}/>
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
