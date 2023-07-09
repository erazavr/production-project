import { NotificationList } from '@/entities/Notification'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDevice } from '@/shared/lib/hooks/useDevice'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Popover } from '@/shared/ui/Popups'
import { memo, useCallback, useState } from 'react'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(function NotificationButton (props: NotificationButtonProps) {
  const { className } = props
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useDevice()

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <Button onClick={onOpenDrawer} variant={ButtonVariant.CLEAR}>
      <Icon inverted Svg={NotificationIcon}/>
    </Button>
  )

  return (
    <>
      {!isMobile
        ? (
          <Popover
            direction={'bottom left'}
            trigger={trigger}
            className={classNames(cls.NotificationButton, {}, [className])}
          >
            <NotificationList className={cls.notifications}/>
          </Popover>
        )
        : (
          <>
            {trigger}
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
              <NotificationList/>
            </Drawer>
          </>
        )}
    </>
  )
})
