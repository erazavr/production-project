import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Dropdown } from 'shared/ui/Popups'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = memo(function AvatarDropdown (props: AvatarDropdownProps) {
  const { className } = props
  const { t } = useTranslation()

  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()
  const onLogout = useCallback(() => dispatch(userActions.logout()), [dispatch])
  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  return (
    <div className={classNames('', {}, [className])}>
      <Dropdown
        direction={'bottom left'}
        items={
          [
            ...(isAdminPanelAvailable
              ? [
                {
                  content: t('Админка'),
                  href: RoutePath.admin_panel
                }
              ]
              : []),
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id
            },
            {
              content: t('Выйти'),
              onClick: onLogout
            }
          ]
        } trigger={<Avatar size={30} src={authData.avatar}/>}/>
    </div>
  )
})
