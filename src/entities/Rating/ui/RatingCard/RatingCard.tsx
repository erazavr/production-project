import { classNames } from '@/shared/lib/classNames/classNames';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo(function RatingCard(props: RatingCardProps) {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
  } = props;

  const { t } = useTranslation();
  const isMobile = useDevice();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        showModal();
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandler = useCallback(() => {
    closeModal();
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    closeModal();
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        data-testid={'RatingCard.Input'}
        onChange={setFeedback}
        value={feedback}
        placeholder={t('Ваш отзыв')}
      />
    </>
  );

  return (
    <Card
      data-testid={'RatingCard'}
      className={classNames('', {}, [className])}
      max
    >
      <VStack align={'center'} gap={'8'}>
        <Text title={starsCount ? t('Спасибо за оценку!') : title} />
        <StarRating
          size={40}
          onSelect={onSelectStars}
          selectedStars={starsCount}
        />
      </VStack>
      {isMobile ? (
        <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
          <VStack gap={'32'}>
            {modalContent}
            <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      ) : (
        <Modal isOpen={isModalOpen} onClose={cancelHandler}>
          <VStack max gap={'32'}>
            {modalContent}
            <HStack max gap={'16'} justify={'end'}>
              <Button
                data-testid={'RatingCard.Close'}
                onClick={cancelHandler}
                variant={ButtonVariant.OUTLINE_RED}
              >
                {t('Закрыть')}
              </Button>
              <Button data-testid={'RatingCard.Send'} onClick={acceptHandler}>
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      )}
    </Card>
  );
});
