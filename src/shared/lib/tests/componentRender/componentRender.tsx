import { Theme } from '@/shared/const/theme'
import { type ReducersMapObject } from '@reduxjs/toolkit'
import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { MemoryRouter } from 'react-router-dom'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
// eslint-disable-next-line ernie-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
// eslint-disable-next-line ernie-plugin/layer-imports
import '@/app/styles/index.scss'

interface componentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  theme?: Theme
}

interface TestProviderProps {
  children: ReactNode
  options?: componentRenderOptions
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props
  const { route = '/', initialState, asyncReducers, theme = Theme.LIGHT } = options

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className='app'>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

export function componentRender (component: ReactNode, options: componentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}
