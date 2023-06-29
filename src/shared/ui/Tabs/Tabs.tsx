import { memo, type ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardVariant } from '../Card/Card'

import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabCLick: (tab: TabItem) => void

}

export const Tabs = memo(function Tabs (props: TabsProps) {
  const {
    className,
    tabs,
    onTabCLick,
    value
  } = props
  const clickHandle = useCallback((tab: TabItem) => () => {
    onTabCLick(tab)
  }, [onTabCLick])

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card
          onClick={clickHandle(tab)}
          variant={tab.value === value ? CardVariant.NORMAL : CardVariant.OUTLINED}
          key={tab.value}
          className={cls.card}
        >{tab.content}
        </Card>
      ))}
    </div>
  )
})
