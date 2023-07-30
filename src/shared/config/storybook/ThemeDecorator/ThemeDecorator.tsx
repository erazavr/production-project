import { Theme } from '@/shared/const/theme'
import { type Story } from '@storybook/react'
// eslint-disable-next-line ernie-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
  return (
    <ThemeProvider initialTheme={theme}>
      <div className='app'>
        <StoryComponent/>
      </div>
    </ThemeProvider>
  )
}
