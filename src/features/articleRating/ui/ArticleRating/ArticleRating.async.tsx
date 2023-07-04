import { Sceleton } from '@/shared/ui/Sceleton/Sceleton'
import { lazy, Suspense } from 'react'
import { ArticleRatingProps } from './ArticleRating'

const ArticleRatingLazy = lazy(async () => await import('./ArticleRating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
  return (
    <Suspense fallback={<Sceleton width="100%" height={140} />}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  )
}
