import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { memo } from 'react'
import { Page } from '@/widgets/Page'

interface ForbiddenPageProps {
  className?: string
}
const ForbiddenPage = memo(function ForbiddenPage (props: ForbiddenPageProps) {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Page data-testid={'ForbiddenPage'} className={classNames('', {}, [className])}>
      {t('У вас нет доступа к этой странице!')}
    </Page>
  )
})

export default ForbiddenPage
