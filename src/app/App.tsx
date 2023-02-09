import { AppRouter } from '@/app/providers/router'
import { useTheme } from '@/app/providers/ThemeProvider'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Navbar'
import { SideBar } from '@/widgets/SideBar/ui/SideBar'
import React, { Suspense } from 'react'
import './styles/index.scss'

export default function App () {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
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
