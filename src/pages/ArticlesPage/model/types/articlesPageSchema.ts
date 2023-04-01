import { type EntityState } from '@reduxjs/toolkit'
import { type Article, type ArticleType, type ArticleView } from 'entities/Article'
import { type ArticleSortField } from 'entities/Article/model/types/article'
import { type SortOrder } from 'shared/types'

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string
  page: number
  limit: number
  hasMore: boolean

  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
