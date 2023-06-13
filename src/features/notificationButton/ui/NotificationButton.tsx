import { NotificationList } from 'entities/Notification'
import { useTranslation } from 'react-i18next'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Popover } from 'shared/ui/Popups'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(function NotificationButton (props: NotificationButtonProps) {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Popover
      direction={'bottom left'}
      trigger={(
        <Button variant={ButtonVariant.CLEAR}>
          <Icon inverted Svg={NotificationIcon}/>
        </Button>
      )}
      className={classNames(cls.NotificationButton, {}, [className])}
    >
      <NotificationList className={cls.notifications}/>
    </Popover>
  )
})
