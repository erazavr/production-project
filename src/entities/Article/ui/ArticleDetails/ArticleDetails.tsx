import {
  ArticleCodeBlockComponent
} from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import {
  ArticleImageBlockComponent
} from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
  ArticleTextBlockComponent
} from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent'
import { type ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CalendarIcon from 'shared/assets/icons/calendar-icon.svg'

import EyeIcon from 'shared/assets/icons/eye-icon.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Icon } from 'shared/ui/Icon/Icon'
import { Sceleton } from 'shared/ui/Sceleton/Sceleton'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'

import cls from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(function ArticleDetails (props: ArticleDetailsProps) {
  const {
    className,
    id
  } = props
  const { t } = useTranslation()

  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)
  const article = useSelector(getArticleDetailsData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  let content

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block}/>
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent key={block.id} block={block} className={cls.block}/>
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block}/>
    default:
      return null
    }
  }, [])

  if (isLoading) {
    content = (
      <>
        <Sceleton className={cls.avatar} height={200} width={200} borderRadius="50%"/>
        <Sceleton className={cls.sceleton} height={30} width={700}/>
        <Sceleton className={cls.sceleton} height={30} width={400}/>
        <Sceleton className={cls.sceleton} height={230} width="100%"/>
        <Sceleton className={cls.sceleton} height={230} width="100%"/>
      </>
    )
  } else if (error) {
    content = (
      <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')}/>
    )
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar src={article?.img} className={cls.avatar} size={200}/>
        </div>
        <Text
          size={TextSize.L}
          title={article?.title}
          text={article?.subtitle}
          className={cls.title}
        />
        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon}/>
          <Text text={String(article?.views)}/>
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon}/>
          <Text text={article?.createdAt}/>
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
