import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { type Comment } from '../../model/types/comment'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { memo } from 'react'

import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = memo(function CommentCard (props: CommentCardProps) {
  const {
    className,
    comment,
    isLoading
  } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Sceleton width={30} height={30} borderRadius={'50%'}/>
          <Sceleton height={16} width={100}/>
        </div>
        <Sceleton width={'100%'} height={50} className={cls.text}/>
      </VStack>
    )
  }

  if (!comment) return null

  return (
    <VStack max gap={'8'} className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={RoutePath.profile + comment.user.id} className={cls.header}>
        <Avatar size={30} src={comment.user.avatar}/>
        <Text title={comment.user.username}/>
      </AppLink>
      <Text text={comment.text} />
    </VStack>
  )
})
