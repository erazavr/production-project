import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import { memo } from 'react'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(function ThemeSwitcher ({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={ButtonVariant.CLEAR}
      onClick={toggleTheme}
      className={classNames('', {}, [className])}
    >
      {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
    </Button>
  )
})
