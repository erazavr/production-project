import React, { Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { classNames } from "./helpers/classNames/classNames"
import AboutPageAsync from './pages/AboutPage/AboutPage.async'
import MainPageAsync from "./pages/MainPage/MainPage.async"
import './styles/index.scss'
import { useTheme } from "./theme/useTheme"

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE THEME</button>
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPageAsync/>}/>
          <Route path="/" element={<MainPageAsync/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}
