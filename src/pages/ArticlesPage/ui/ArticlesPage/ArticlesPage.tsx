import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect'
import { Page } from '@/widgets/Page'
import {
  fetchNextArticlesPage
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlePageReducer } from '../../model/slices/articlePageSlice'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'

import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const [searchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters/>
        <ArticleInfiniteList className={cls.list}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
