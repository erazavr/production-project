import { type ArticleDetailsRecommendationSchema } from './articleDetailsRecommendationSchema';
import { type ArticleDetailsCommentSchema } from './articleDetailsCommentSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsRecommendationSchema;
}
