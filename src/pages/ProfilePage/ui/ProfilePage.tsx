import { EditableProfileCard } from 'features/editableProfileCard'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  if (!id) {
    return <Text text={t('Профиль не найден')}/>
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <EditableProfileCard id={id}/>
    </Page>
  )
}

export default memo(ProfilePage)
