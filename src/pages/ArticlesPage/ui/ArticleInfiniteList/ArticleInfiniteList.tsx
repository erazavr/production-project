import { ArticleList } from '@/entities/Article';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelector';
import { getArticles } from '../../model/slices/articlePageSlice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(function ArticleInfiniteList(
  props: ArticleInfiniteListProps,
) {
  const { className } = props;
  const { t } = useTranslation();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />;
  }

  return (
    <div className={classNames('', {}, [className])}>
      <ArticleList isLoading={isLoading} view={view} articles={articles} />
    </div>
  );
});
