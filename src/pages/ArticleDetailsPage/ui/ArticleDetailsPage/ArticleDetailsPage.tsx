import { ArticleDetails, ArticleList } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import {
  getArticleRecommendationsIsLoading
} from 'pages/ArticleDetailsPage/model/selectors/recommendations'
import {
  fetchArticleRecommendations
} from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import {
  ArticleDetailsPageHeader
} from 'pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationSlice'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

  const dispatch = useAppDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
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
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader/>
        <ArticleDetails id={id}/>
        <Text size={TextSize.L} title={t('Рекомендуем')}/>
        <ArticleList
          target={'_blank'}
          articles={ recommendations}
          isLoading={recommendationsIsLoading}
          className={cls.recommendations}
        />
        <Text size={TextSize.L} title={t('Коментарии')} className={cls.commentTitle}/>
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsLoading} comments={comments}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
