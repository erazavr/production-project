import { classNames } from '@/shared/lib/classNames/classNames'
import { Sceleton } from '@/shared/ui/Sceleton'
import { VStack } from '@/shared/ui/Stack'
import { memo } from 'react'
import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'

import cls from './NotificationList.module.scss'

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(function NotificationList (props: NotificationListProps) {
  const { className } = props

  const {
    data,
    isLoading
  } = useNotifications(null, {
    pollingInterval: 5000
  })

  if (isLoading) {
    return (
      <VStack gap={'16'} max className={classNames(cls.NotificationList, {}, [className])}>
        <Sceleton width={'100%'} borderRadius={'8px'} height={80}/>
        <Sceleton width={'100%'} borderRadius={'8px'} height={80}/>
        <Sceleton width={'100%'} borderRadius={'8px'} height={80}/>
      </VStack>
    )
  }

  return (
    <VStack gap={'16'} max className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item}/>
      ))}
    </VStack>
  )
})
