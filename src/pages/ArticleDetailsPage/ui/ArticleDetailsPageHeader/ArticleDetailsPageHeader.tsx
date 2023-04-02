import { getArticleDetailsData } from 'entities/Article'
import { getUserAuthData } from 'entities/User'
import { getCanArticleEdit } from 'pages/ArticleDetailsPage/model/selectors/article'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { Button } from 'shared/ui/Button/Button'

import cls from './ArticleDetailsPageHeader.module.scss'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(function ArticleDetailsPageHeader (props: ArticleDetailsPageHeaderProps) {
  const { className } = props
  const { t } = useTranslation()

  const userData = useSelector(getUserAuthData)
  const article = useSelector(getArticleDetailsData)

  const canEdit = useSelector(getCanArticleEdit)

  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [article?.id, navigate])

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад к списпку')}</Button>
      {canEdit && <Button onClick={onEditArticle}>{t('Редактировать')}</Button>}
    </div>
  )
})
