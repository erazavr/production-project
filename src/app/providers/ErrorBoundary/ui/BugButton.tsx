import { Button } from '@/shared/ui/Button/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (!error) return

    throw new Error()
  }, [error])

  const onThrow = () => { setError(true) }

  return (
    <Button onClick={onThrow} >
      {t('throw error')}
    </Button>
  )
}
