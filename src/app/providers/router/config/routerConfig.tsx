import { UserRole } from '@/entities/User'
import { AboutPage } from '@/pages/AboutPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AppRoutes, RoutePath } from '@/shared/const/router'
import { AppRouteProps } from '@/shared/types/router'

export const routeConfig: AppRouteProps[] = [
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage/>
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage/>
  },
  {
    path: RoutePath[AppRoutes.PROFILE] + ':id',
    element: <ProfilePage/>,
    authOnly: true
  },
  {
    path: RoutePath[AppRoutes.ARTICLES],
    element: <ArticlesPage/>,
    authOnly: true
  },
  {
    path: RoutePath[AppRoutes.ARTICLE_DETAILS] + ':id',
    element: <ArticleDetailsPage/>,
    authOnly: true
  },
  {
    path: RoutePath[AppRoutes.ARTICLE_CREATE],
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: RoutePath[AppRoutes.ARTICLE_EDIT],
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: RoutePath[AppRoutes.ADMIN_PANEL],
    element: <AdminPanelPage/>,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: RoutePath[AppRoutes.FORBIDDEN],
    element: <ForbiddenPage/>
  },
  {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage/>
  }
]
