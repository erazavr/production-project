import { type EntityState } from '@reduxjs/toolkit/src/entities/models'
import { type Article } from '@/entities/Article'
import { type Comment } from '@/entities/Comment'

export interface ArticleDetailsRecommendationSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string
}
