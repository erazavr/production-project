import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { Suspense } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Loader } from '@/shared/ui/Loader'
import { Modal } from '@/shared/ui/Modal'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const {
    className,
    isOpen,
    onClose
  } = props
  return (
    <Modal
      lazy
      isOpen={isOpen}
      onClose={onClose}
      className={classNames('', {}, [className])}
    >
      {/* Main Chunk наоброт увеличился, потом надо посмотреть и решить проблему */}
      <Suspense fallback={<Loader/>}>
        <LoginFormAsync onSuccess={onClose}/>
      </Suspense>
    </Modal>
  )
}
