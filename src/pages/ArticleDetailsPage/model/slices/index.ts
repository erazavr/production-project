import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { articleDetailsPageRecommendationSliceReducer } from './articleDetailsPageRecommendationSlice'
import { type ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage/model/types'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentsReducer,
  recommendations: articleDetailsPageRecommendationSliceReducer
})
