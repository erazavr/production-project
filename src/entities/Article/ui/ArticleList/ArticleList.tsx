import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem'
import {
  ArticleListItemSceleton
} from 'entities/Article/ui/ArticleListItem/ArticleListItemSceleton'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { type Article, ArticleView } from '../../model/types/article'

import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

export const ArticleList = memo(function ArticleList (props: ArticleListProps) {
  const {
    className,
    isLoading,
    articles,
    view = ArticleView.GRID
  } = props
  const { t } = useTranslation()

  const renderArticle = useCallback((article: Article) => (
    <ArticleListItem article={article} key={article.id} view={view} className={cls.card}/>
  ), [view])

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        {new Array(view === ArticleView.GRID ? 9 : 3)
          .fill(0)
          .map((item, index) => (
            <ArticleListItemSceleton className={cls.card} view={view} key={index}/>
          ))}
      </div>
    )
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  )
})
