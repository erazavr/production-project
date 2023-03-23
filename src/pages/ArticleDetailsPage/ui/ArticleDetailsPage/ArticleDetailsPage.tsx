import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button } from 'shared/ui/Button/Button'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Text } from 'shared/ui/Text/Text'
import {
  articleDetailsCommentsReducer,
  getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button onClick={onBackToList}>{t('Назад к списпку')}</Button>
        <ArticleDetails id={id}/>
        <Text title={t('Коментарии')} className={cls.commentTitle}/>
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsLoading} comments={comments}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
