import { ArticleList, ArticleViewSelector, type ArticleView } from 'entities/Article'
import {
  fetchNextArticlesPage
} from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { Page } from 'shared/ui/Page/Page'
import {
  getArticlesPageError, getArticlesPageHasMore,
  getArticlesPageIsLoading, getArticlesPageNum,
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

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(articlePageActions.initState())
    dispatch(fetchArticleList({
      page: 1
    }))
  })

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector onChangeView={onChangeView} view={view}/>
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
