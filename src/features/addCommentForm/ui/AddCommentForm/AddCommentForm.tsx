import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import {
  addCommentFormActions,
  addCommentFormReducer
} from '../../model/slices/addCommentFormSlice'

import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo(function AddCommentForm (props: AddCommentFormProps) {
  const {
    className,
    onSendComment
  } = props
  const { t } = useTranslation()

  const text = useSelector(getAddCommentFormText)

  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack
        data-testid={'AddCommentForm'}
        justify={'between'}
        max
        className={classNames(cls.AddCommentForm, {}, [className])}
      >
        <Input
          className={cls.input}
          data-testid={'AddCommentForm.Input'}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button data-testid={'AddCommentForm.Button'} onClick={onSendHandler}>{t('Отправить')}</Button>
      </HStack>
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
