import { CommentCard } from '../CommentCard/CommentCard'
import { Text } from 'shared/ui/Text/Text'
import { type Comment } from '../../model/types/comment'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'

import cls from './CommentList.module.scss'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(function CommentList (props: CommentListProps) {
  const {
    className,
    comments,
    isLoading
  } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map(comment =>
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
            className={cls.comment}
          />
        )
        : <Text
          text={t('Комментарии отсутствуют')}/>}
    </div>
  )
})
