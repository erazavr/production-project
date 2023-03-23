import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import AboutIcon from 'shared/assets/icons/about-icon.svg'
import ArticleIcon from 'shared/assets/icons/article-icon.svg'
import MainIcon from 'shared/assets/icons/main-icon.svg'
import ProfileIcon from 'shared/assets/icons/profile-icon.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { type SideBarItemType } from '../types/sidebar'

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const sideBarItemList: SideBarItemType[] = [
    {
      path: RoutePath.main,
      text: 'Главная',
      Icon: MainIcon
    },
    {
      path: RoutePath.about,
      text: 'О сайте',
      Icon: AboutIcon
    }
  ]

  if (userData) {
    sideBarItemList.push(
      {
        path: RoutePath.profile + userData.id,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true
      },
      {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true
      }
    )
  }

  return sideBarItemList
})
