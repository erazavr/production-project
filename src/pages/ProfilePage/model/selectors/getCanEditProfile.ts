import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { getProfileData } from 'features/editableProfileCard'

export const getCanEditProfile = createSelector(
  getUserAuthData,
  getProfileData,
  (userData, profileData) => userData?.id === profileData?.id
)
