import {
  type ArticleSortField,
  type ArticleType,
  ArticleTypeTabs,
  type ArticleView,
  ArticleViewSelector
} from '@/entities/Article'
import { ArticleSortSelector } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { type SortOrder } from '@/shared/types/sort'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { articlePageActions } from '../../model/slices/articlePageSlice'

import cls from './ArticlesPageFilters.module.scss'

interface ArticlesPageFilterProps {
  className?: string
}

export const ArticlesPageFilters = memo(function ArticlesPageFilter (props: ArticlesPageFilterProps) {
  const { className } = props
  const { t } = useTranslation()

  const view = useSelector(getArticlesPageView)
  const order = useSelector(getArticlesPageOrder)
  const sort = useSelector(getArticlesPageSort)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const dispatch = useAppDispatch()

  const fetchData = useCallback(() => {
    dispatch(fetchArticleList({ replace: true }))
  }, [dispatch])

  const debounceFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlePageActions.setOrder(newOrder))
    dispatch(articlePageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlePageActions.setSort(newSort))
    dispatch(articlePageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlePageActions.setSearch(search))
    dispatch(articlePageActions.setPage(1))
    debounceFetchData()
  }, [debounceFetchData, dispatch])

  const onChangeType = useCallback((tab: ArticleType) => {
    dispatch(articlePageActions.setType(tab))
    dispatch(articlePageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  return (
    <div className={classNames('', {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector onChangeView={onChangeView} view={view}/>
      </div>
      <Card className={cls.search}>
        <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch}/>
      </Card>
      <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType}/>
    </div>
  )
})
