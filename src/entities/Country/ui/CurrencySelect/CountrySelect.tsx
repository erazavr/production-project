import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
  className?: string
  value?: string
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options = [
  {
    value: Country.Kyrgyzstan,
    content: Country.Kyrgyzstan
  },
  {
    value: Country.Russia,
    content: Country.Russia
  },
  {
    value: Country.Ukraine,
    content: Country.Ukraine
  },
  {
    value: Country.Kazakhstan,
    content: Country.Kazakhstan
  }
]

export const CountrySelect = memo(function CountrySelect (props: CountrySelectProps) {
  const {
    className,
    value,
    onChange,
    readonly
  } = props
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      items={options}
      value={value}
      defaultValue={t('Укажите страну')}
      label={t('Укажите страну')}
      readonly={readonly}
      direction={'top'}
    />
  )
})
