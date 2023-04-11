import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import { VStack } from 'shared/ui/Stack'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

export const ArticleDetailsComments = memo(function ArticleDetailsComments (props: ArticleDetailsCommentsProps) {
  const { className, id } = props
  const { t } = useTranslation()

  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

  const dispatch = useAppDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  return (
    <VStack gap={'8'} max className={classNames('', {}, [className])}>
      <Text size={TextSize.L} title={t('Комментарии')}/>
      <AddCommentForm onSendComment={onSendComment}/>
      <CommentList isLoading={commentsIsLoading} comments={comments}/>
    </VStack>
  )
})
