import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import {
  useGetArticleRating,
  useRateArticle,
} from '../../api/articleRatingApi';
import { Sceleton } from '@/shared/ui/Sceleton';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo(function ArticleRating(props: ArticleRatingProps) {
  const { className, articleId } = props;
  const { t } = useTranslation();

  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Sceleton width={'100%'} height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      title={t('Оцените статью')}
      hasFeedback
      feedbackTitle={t(
        'Оставьте свой отзыв о статье, это поможет улучшить качество',
      )}
      className={className}
    />
  );
});

export default ArticleRating;
