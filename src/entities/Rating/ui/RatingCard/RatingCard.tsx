import { classNames } from '@/shared/lib/classNames/classNames'
import { useDevice } from '@/shared/lib/hooks/useDevice'
import { StarRating } from '@/shared/StarRating/StarRating'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo(function RatingCard (props: RatingCardProps) {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept
  } = props

  const { t } = useTranslation()
  const isMobile = useDevice()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const showModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      showModal()
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandler = useCallback(() => {
    closeModal()
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    closeModal()
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <>
      <Text title={feedbackTitle}/>
      <Input onChange={setFeedback} value={feedback} placeholder={t('Ваш отзыв')}/>
    </>

  )

  return (
    <Card className={classNames('', {}, [className])}>
      <VStack align={'center'} gap={'8'}>
        <Text title={title}/>
        <StarRating size={40} onSelect={onSelectStars}/>
      </VStack>
      {isMobile
        ? (
          <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
            <VStack gap={'32'}>
              {modalContent}
              <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>{t('Отправить')}</Button>
            </VStack>
          </Drawer>
        )
        : (
          <Modal isOpen={isModalOpen} onClose={cancelHandler}>
            <VStack max gap={'32'}>
              {modalContent}
              <HStack max gap={'16'} justify={'end'}>
                <Button onClick={cancelHandler}
                  variant={ButtonVariant.OUTLINE_RED}>{t('Закрыть')}</Button>
                <Button onClick={acceptHandler}>{t('Отправить')}</Button>
              </HStack>
            </VStack>
          </Modal>
        )}
    </Card>
  )
})
