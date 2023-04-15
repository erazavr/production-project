import { HStack, VStack } from 'shared/ui/Stack'
import {
  ArticleCodeBlockComponent
} from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import {
  ArticleImageBlockComponent
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
  ArticleTextBlockComponent
} from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { memo, useCallback } from 'react'
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
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
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
import { type ArticleBlock, ArticleBlockType } from '../../model/types/article'

import cls from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string
  id?: string
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

  useInitialEffect(() => {
    dispatch(fetchArticleById(id))
  })

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
        <Sceleton className={cls.sceleton} height={30} width={'100%'}/>
        <Sceleton className={cls.sceleton} height={30} width={'100%'}/>
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
        <HStack justify={'center'} max className={cls.avatarWrapper}>
          <Avatar src={article?.img} className={cls.avatar} size={200}/>
        </HStack>
        <VStack gap={'4'} max>
          <Text
            size={TextSize.L}
            title={article?.title}
            text={article?.subtitle}
            className={cls.title}
          />
          <HStack gap={'8'} >
            <Icon Svg={EyeIcon} className={cls.icon}/>
            <Text text={String(article?.views)}/>
          </HStack>
          <HStack gap={'8'} >
            <Icon Svg={CalendarIcon} className={cls.icon}/>
            <Text text={article?.createdAt}/>
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap={'16'} max className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  )
})
