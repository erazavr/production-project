import { ArticleView } from '../../model/const/articleConsts'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton'

import cls from './ArticleListItem.module.scss'

interface ArticleListItemSceletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSceleton = memo(function ArticleListItemSceleton (props: ArticleListItemSceletonProps) {
  const { className, view } = props

  if (view === ArticleView.LIST) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Sceleton height={30} width={30} borderRadius={'50%'}/>
            <Sceleton width={150} height={16} className={cls.username}/>
            <Sceleton width={150} height={16} className={cls.date}/>
          </div>
          <Sceleton width={250} height={24} className={cls.title}/>
          <Sceleton height={200} className={cls.img}/>
          <div className={cls.footer}>
            <Sceleton width={200} height={36}/>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card>
        <div className={cls.imageWrapper}>
          <Sceleton width={200} height={200} className={cls.img}/>
        </div>
        <div className={cls.infoWrapper}>
          <Sceleton width={130} height={16}/>
        </div>
        <Sceleton width={150} height={16}/>
      </Card>
    </div>
  )
})
