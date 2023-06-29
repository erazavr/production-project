import { ArticleDetails } from '@/entities/Article'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page/Page'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  // if (!id) {
  //   return (
  //     <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
  //       {t('Статья не найдена')}
  //     </div>
  //   )
  // }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap={'16'} max>
          <ArticleDetailsPageHeader/>
          <ArticleDetails id={id}/>
          <ArticleRecommendationsList/>
          <ArticleDetailsComments id={id}/>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
