import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/Page'

const MainPage = () => {
  const { t } = useTranslation()
  return (
    <Page>
      {t('Главная')}
    </Page>
  )
}

export default memo(MainPage)
