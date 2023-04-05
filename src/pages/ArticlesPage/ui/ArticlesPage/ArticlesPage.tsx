import { ArticleList } from 'entities/Article'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import {
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import {
  fetchNextArticlesPage
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlePageReducer, getArticles } from '../../model/slices/articlePageSlice'

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

  const [searchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters/>
        <ArticleList
          isLoading={isLoading}
          className={cls.list}
          view={view}
          articles={articles}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
