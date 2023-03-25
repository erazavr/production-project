import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo, type MutableRefObject, useRef } from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'

import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: React.ReactNode
  onScrollEnd?: () => void
}

export const Page = memo(function Page (props: PageProps) {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  })

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef}/>
    </section>
  )
})
