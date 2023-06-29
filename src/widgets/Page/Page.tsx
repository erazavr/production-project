import { type StateSchema } from '@/app/providers/StoreProvider'
import { getUIScrollByPath, UIActions } from '@/features/UI'
import React, { memo, type MutableRefObject, type UIEvent, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle'

import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: React.ReactNode
  onScrollEnd?: () => void
}

export const Page = memo(function Page (props: PageProps) {
  const {
    className,
    children,
    onScrollEnd
  } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname))

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle<UIEvent<HTMLElement>>((e: UIEvent<HTMLElement>) => {
    dispatch(UIActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname
    }))
  }, 500)

  return (
    <main
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      {onScrollEnd
        ? (
          <div className={cls.trigger} ref={triggerRef}/>
        )
        : null}
    </main>
  )
})
