import { profileReducer } from 'entities/Profile'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Text } from 'shared/ui/Text/Text'
import { memo } from 'react'

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount >
      <div className={classNames('', {}, [className])}>
        <Text title={t('Профиль')}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ProfilePage)
