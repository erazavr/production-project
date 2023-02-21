import { AppRouter } from 'app/providers/router'
import React, { Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { SideBar } from 'widgets/SideBar/ui/SideBar'

export default function App () {
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
