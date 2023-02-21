import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false)

  const { t } = useTranslation()

  const onToggleModal = useCallback(() => {
    setIsAuthModal(prev => !prev)
  }, [])
  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <Button variant={ButtonVariant.CLEAR} className={cls.links} onClick={onToggleModal}>
        {t('Войти')}
      </Button>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum dolor eaque, error et
        labore laborum molestiae molestias nam nisi officiis provident quibusdam quis sapiente
        suscipit tempore temporibus ut vel.
      </Modal>
    </header>
  )
}
