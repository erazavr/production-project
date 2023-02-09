import { classNames } from '@/shared/lib/classNames/classNames'
import { LangSwitcher } from '@/widgets/LangSwitcher'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { useState } from 'react'

import cls from './SideBar.module.scss'

interface SideBarProps {
  className?: string
}

export const SideBar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => { setCollapsed(prev => !prev) }

  return (
    <aside
      className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [className])}
    >
      <button onClick={onToggle}>TOGGLE</button>
      <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher className={cls.lng}/>
      </div>
    </aside>
  )
}
