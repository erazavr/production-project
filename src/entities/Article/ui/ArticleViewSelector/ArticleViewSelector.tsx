import { ArticleView } from '../../model/types/article'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import GridIcon from 'shared/assets/icons/grid-icon.svg'
import ListIcon from 'shared/assets/icons/list-icon.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onChangeView: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: GridIcon
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon
  }
]

export const ArticleViewSelector = memo(function ArticleViewSelector (props: ArticleViewSelectorProps) {
  const {
    className,
    onChangeView,
    view
  } = props

  const onClick = (newView: ArticleView) => () => {
    onChangeView?.(newView)
  }

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map(viewType => (
        <Button
          key={viewType.view}
          variant={ButtonVariant.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon Svg={viewType.icon} className={classNames('', { [cls.selected]: viewType.view === view }, [])}/>
        </Button>
      ))}
    </div>
  )
})
