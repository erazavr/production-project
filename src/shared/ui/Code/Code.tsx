import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import CopyIcon from '../../assets/icons/copy-icon.svg'
import { Button, ButtonVariant } from '../Button/Button'

import cls from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

export const Code = memo(function Code (props: CodeProps) {
  const {
    className,
    text
  } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Текст скопирован!')
    })
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button onClick={onCopy} className={cls.copyBtn} variant={ButtonVariant.CLEAR}>
        <CopyIcon className={cls.copyIcon}/>
      </Button>
      <code>
        {text}
      </code>
    </pre>
  )
})
