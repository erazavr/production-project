import { VStack } from '@/shared/ui/Stack';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from '@/shared/ui/Text';
import { type Comment } from '../../model/types/comment';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(function CommentList(props: CommentListProps) {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap={'16'} max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});
