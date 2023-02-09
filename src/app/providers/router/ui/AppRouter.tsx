import { routeConfig } from '@/shared/config/routeConfig/routeConfig'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routeConfig
          .map(({ path, element }) =>
            <Route
              key={path}
              path={path}
              element={
                <main className="page-wrapper">{element}</main>
              }/>
          )}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
