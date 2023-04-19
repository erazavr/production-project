import { ArticleBlockType, ArticleView } from '../../model/const/articleConsts'
import { type HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import EyeIcon from 'shared/assets/icons/eye-icon.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Card } from 'shared/ui/Card/Card'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text } from 'shared/ui/Text/Text'
import {
  type Article,
  type ArticleTextBlock
} from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

import cls from './ArticleListItem.module.scss'

interface ArticleListItemProps {
  className?: string
  view: ArticleView
  article: Article
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo(function ArticleListItem (props: ArticleListItemProps) {
  const {
    className,
    article,
    view,
    target
  } = props
  const { t } = useTranslation()

  const types = <Text text={article.type.join(', ')} className={cls.types}/>
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views}/>
      <Icon Svg={EyeIcon}/>
    </>
  )

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(block => block.type ===
      ArticleBlockType.TEXT) as ArticleTextBlock
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar src={article.user.avatar} size={30}/>
            <Text text={article.user.username} className={cls.username}/>
            <Text text={article.createdAt} className={cls.date}/>
          </div>
          <Text title={article.title} className={cls.title}/>
          {types}
          <img src={article.img} alt={article.title} className={cls.img}/>
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>}
          <div className={cls.footer}>
            <AppLink target={target} to={RoutePath.article_details + article.id}>
              <Button variant={ButtonVariant.OUTLINE}>
                {t('Читать далее')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames('', {}, [className, cls[view]])}
    >
      <Card>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img}/>
          <Text text={article.createdAt} className={cls.date}/>
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title}/>
      </Card>
    </AppLink>
  )
})
