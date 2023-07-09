import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { type ChangeEvent, useMemo } from 'react'

import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: string
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string> (props: SelectProps<T>) => {
  const {
    className,
    label,
    onChange,
    value,
    options,
    readonly
  } = props
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value as T)
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
}
