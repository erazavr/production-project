import { AppRouter } from 'app/providers/router'
import { userActions } from 'entities/User'
import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { SideBar } from 'widgets/SideBar/ui/SideBar'

export default function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Header/>
        <div className="content-page">
          <SideBar/>
          <AppRouter/>
        </div>
      </Suspense>
    </div>
  )
}
