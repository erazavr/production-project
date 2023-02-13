import { routeConfig } from '@/shared/config/routeConfig/routeConfig'
import { PageLoader } from '@/widgets/PageLoader'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (

    <Routes>
      {routeConfig
        .map(({ path, element }) =>
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader/>}>
                <main className="page-wrapper">{element}</main>
              </Suspense>
            }/>
        )}
    </Routes>

  )
}

export default AppRouter
