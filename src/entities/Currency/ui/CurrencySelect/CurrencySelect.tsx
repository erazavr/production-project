import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Currency } from '../../model/types/currency'

interface CurrencySelectProps {
  className?: string
  value?: string
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  {
    value: Currency.KGS,
    content: Currency.KGS
  },
  {
    value: Currency.RUB,
    content: Currency.RUB
  },
  {
    value: Currency.USD,
    content: Currency.USD
  }
]

export const CurrencySelect = memo(function CurrencySelect (props: CurrencySelectProps) {
  const {
    className,
    value,
    onChange,
    readonly
  } = props
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue={t('Укажите валюту')}
      readonly={readonly}
      direction={'top right'}
      label={t('Укажите валюту')}
    />
  )
})
