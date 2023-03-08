import { type ChangeEvent, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'

import cls from './Select.module.scss'

interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo(function Select (props: SelectProps) {
  const {
    className,
    label,
    onChange,
    value,
    options,
    readonly
  } = props
  const { t } = useTranslation()

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option
        key={opt.value}
        className={cls.option}
        value={opt.value}
      >
        {opt.content}
      </option>
    ))
  }, [options])

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <span className={cls.label}>
          {`${label} >`}
        </span>
      )}
      <select
        disabled={readonly}
        value={value}
        className={cls.select}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  )
})
