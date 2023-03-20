import { type EntityState } from '@reduxjs/toolkit/src/entities/models'
import { type Comment } from 'entities/Comment'

export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
  isLoading?: boolean
  error?: string
}
