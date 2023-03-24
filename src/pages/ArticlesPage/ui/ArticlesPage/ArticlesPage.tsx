import { ArticleList, ArticleViewSelector, type ArticleView } from 'entities/Article'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import {
  fetchArticleList
} from '../../model/services/fetchArticleList/fetchArticleList'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import {
  articlePageActions,
  articlePageReducer,
  getArticles
} from '../../model/slices/articlePageSlice'

import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)

  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchArticleList())
    dispatch(articlePageActions.initState())
  })

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector onChangeView={onChangeView} view={view}/>
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
