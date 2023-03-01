import { memo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { SideBarItemList } from 'widgets/SideBar/model/items'
import { SideBarItem } from 'widgets/SideBar/ui/SideBarItem/SideBarItem'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'

import cls from './SideBar.module.scss'

interface SideBarProps {
  className?: string
}

export const SideBar = memo(function SideBar ({ className }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [className])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        variant={ButtonVariant.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={cls.items}>
        {SideBarItemList.map(item => (
          <SideBarItem key={item.path} item={item} collapsed={collapsed}/>
        ))}
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher short={collapsed}/>
      </div>
    </aside>
  )
})
