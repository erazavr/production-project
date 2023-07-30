import { AppRouter } from './providers/router'
import { getUserInited, userActions } from '@/entities/User'
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Header'
import { SideBar } from '@/widgets/SideBar'

export default function App () {
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Header/>
        <div className="content-page">
          <SideBar/>
          {inited && <AppRouter/>}
        </div>
      </Suspense>
    </div>
  )
}
