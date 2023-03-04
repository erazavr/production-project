import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { memo, useEffect } from 'react'

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount >
      <div className={classNames('', {}, [className])}>
        <ProfileCard/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ProfilePage)
