import { getUserAuthData } from '@/entities/User'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'

interface EditableProfileHeaderProps {
  className?: string
}

export const EditableProfileHeader = memo(function EditableProfileHeader (props: EditableProfileHeaderProps) {
  const { className } = props
  const { t } = useTranslation()
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack max justify={'between'} className={classNames('', {}, [className])}>
      <Text title={t('Профиль')}/>
      {canEdit && <div >
        {readonly
          ? (
            <Button
              data-testid={'EditableProfileHeader.EditButton'}
              onClick={onEdit}
              variant={ButtonVariant.OUTLINE}
            >
              {t('Редактировать')}
            </Button>
          )
          : (
            <HStack gap={'8'}>
              <Button
                data-testid={'EditableProfileHeader.CancelButton'}
                onClick={onCancelEdit}
                variant={ButtonVariant.OUTLINE_RED}
              >
                {t('Отменить')}
              </Button>
              <Button
                data-testid={'EditableProfileHeader.SaveButton'}
                onClick={onSave}
                variant={ButtonVariant.OUTLINE}
              >
                {t('Сохранить')}
              </Button>
            </HStack>
          )
        }
      </div>}

    </HStack>
  )
})
