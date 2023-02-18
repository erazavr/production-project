import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={toggle} variant={ButtonVariant.CLEAR}
    >
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  )
}
