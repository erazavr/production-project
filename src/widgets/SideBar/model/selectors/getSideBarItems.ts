import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import ArticleIcon from '@/shared/assets/icons/article-icon.svg';
import MainIcon from '@/shared/assets/icons/main-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { type SideBarItemType } from '../types/sidebar';

export const getSideBarItems = createSelector(getUserAuthData, userData => {
  const sideBarItemList: SideBarItemType[] = [
    {
      path: getRouteMain(),
      text: 'Главная',
      Icon: MainIcon,
    },
    {
      path: getRouteAbout(),
      text: 'О сайте',
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sideBarItemList.push(
      {
        path: getRouteProfile(userData.id),
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true,
      },
    );
  }

  return sideBarItemList;
});
