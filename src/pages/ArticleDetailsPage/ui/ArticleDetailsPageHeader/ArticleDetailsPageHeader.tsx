import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { getCanArticleEdit } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(function ArticleDetailsPageHeader(
  props: ArticleDetailsPageHeaderProps,
) {
  const { className } = props;
  const { t } = useTranslation();

  const article = useSelector(getArticleDetailsData);

  const canEdit = useSelector(getCanArticleEdit);

  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (!article) return;
    navigate(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  return (
    <HStack justify={'between'} max className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
      {canEdit && <Button onClick={onEditArticle}>{t('Редактировать')}</Button>}
    </HStack>
  );
});
