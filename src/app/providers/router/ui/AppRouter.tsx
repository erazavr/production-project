import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import React, { memo, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData)

  const routes = useMemo(() => {
    return routeConfig.filter(route => {
      return !(route.authOnly && !isAuth)
    })
  }, [isAuth])

  return (
    <Routes>
      {routes
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

export default memo(AppRouter)
