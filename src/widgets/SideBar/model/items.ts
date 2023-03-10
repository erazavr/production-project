import type { VFC, SVGProps } from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-icon.svg'
import MainIcon from 'shared/assets/icons/main-icon.svg'
import ProfileIcon from 'shared/assets/icons/profile-icon.svg'
import ArticleIcon from 'shared/assets/icons/article-icon.svg'

export interface SideBarItemType {
  path: string
  text: string
  Icon: VFC<SVGProps<SVGSVGElement>>
  authOnly?: boolean
}
export const SideBarItemList: SideBarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    Icon: MainIcon
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
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
]
