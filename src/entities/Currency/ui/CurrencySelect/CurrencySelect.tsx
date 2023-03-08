import { Currency } from 'entities/Currency'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'

interface CurrencySelectProps {
  className?: string
  value?: string
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  { value: Currency.KGS, content: Currency.KGS },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo(function CurrencySelect (props: CurrencySelectProps) {
  const { className, value, onChange, readonly } = props
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
