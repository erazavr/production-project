import { type Article } from '@/entities/Article';
import { type EntityState } from '@reduxjs/toolkit/src/entities/models';

export interface ArticleDetailsRecommendationSchema
  extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}
