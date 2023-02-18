import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'

import AboutIcon from 'shared/assets/icons/about-icon.svg'
import MainIcon from 'shared/assets/icons/main-icon.svg'

import cls from './SideBar.module.scss'

interface SideBarProps {
  className?: string
}

export const SideBar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const { t } = useTranslation()

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
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
          className={cls.item}
        >
          <MainIcon className={cls.icon}/>
          <span className={cls.link}>
            {t('Главная')}
          </span>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
          className={cls.item}
        >
          <AboutIcon className={cls.icon}/>
          <span className={cls.link}>
            {t('О сайте')}
          </span>
        </AppLink>
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher short={collapsed}/>
      </div>
    </aside>
  )
}
