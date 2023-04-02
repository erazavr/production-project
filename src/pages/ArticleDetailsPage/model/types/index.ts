import {
  type ArticleDetailsCommentSchema,
  type ArticleDetailsRecommendationSchema
} from 'pages/ArticleDetailsPage'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema
  recommendations: ArticleDetailsRecommendationSchema
}
