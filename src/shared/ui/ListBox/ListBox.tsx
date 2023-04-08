import { Listbox as HListBox } from '@headlessui/react'
import { type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { type DropDownDirection } from 'shared/types/ui'
import { Button } from '../Button/Button'
import { HStack } from '../Stack'
import cls from './ListBox.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  readonly?: boolean
  direction?: DropDownDirection
  label?: string
}

const mapDirectionClasses: Record<DropDownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight
}

export function ListBox (props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    direction = 'bottom right'
  } = props

  const optionsClasses = [mapDirectionClasses[direction]]

  return (
    <HStack gap={'16'}>
      {label &&
        <span className={classNames('', { [cls.readonly]: readonly })}>{label + ' >'}</span>}
      <HListBox
        disabled={readonly}
        as={'div'}
        value={value}
        className={classNames(cls.ListBox, {}, [className])}
        onChange={onChange}
      >
        <HListBox.Button className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({
                active,
                selected
              }) => (
                <li className={
                  classNames(
                    cls.item,
                    {
                      [cls.active]: active,
                      [cls.disabled]: item.disabled
                    })
                }
                >
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
