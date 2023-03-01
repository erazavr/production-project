import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { type SideBarItemType } from 'widgets/SideBar/model/items'

import cls from './SideBarItem.module.scss'

interface SideBarItemProps {
  item: SideBarItemType
  collapsed: boolean
}

export const SideBarItem = memo(function SideBarItem (props: SideBarItemProps) {
  const { item, collapsed } = props
  const { t } = useTranslation()
  return (
    <div className={classNames('', { [cls.collapsed]: collapsed })}>
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={cls.item}
      >
        <item.Icon className={cls.icon}/>
        <span className={cls.link}>
          {t(item.text)}
        </span>
      </AppLink>
    </div>
  )
})
