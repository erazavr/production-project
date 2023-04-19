import { EditableProfileCard } from 'features/editableProfileCard'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()

  return (
    <Page className={classNames('', {}, [className])}>
      <EditableProfileCard id={id}/>
    </Page>
  )
}

export default memo(ProfilePage)
