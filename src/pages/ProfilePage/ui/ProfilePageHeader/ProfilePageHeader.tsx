import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'

import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation()

  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')}/>
      {readonly
        ? (
          <Button onClick={onEdit} variant={ButtonVariant.OUTLINE} className={cls.editBtn}>
            {t('Редактировать')}
          </Button>
        )
        : (
          <>
            <Button onClick={onCancelEdit} variant={ButtonVariant.OUTLINE_RED} className={cls.editBtn}>
              {t('Отменить')}
            </Button>
            <Button onClick={onSave} variant={ButtonVariant.OUTLINE} className={cls.saveBtn}>
              {t('Сохранить')}
            </Button>
          </>
        )
      }
    </div>
  )
}
