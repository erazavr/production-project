import { Listbox as HListBox } from '@headlessui/react'
import { type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from '../Button/Button'
import { HStack } from '../Stack'
import cls from './ListBox.module.scss'

const people = [
  {
    id: 1,
    name: 'Durward Reynolds',
    unavailable: false
  },
  {
    id: 2,
    name: 'Kenton Towne',
    unavailable: false
  },
  {
    id: 3,
    name: 'Therese Wunsch',
    unavailable: false
  },
  {
    id: 4,
    name: 'Benedict Kessler',
    unavailable: true
  },
  {
    id: 5,
    name: 'Katelyn Rohan',
    unavailable: false
  }
]

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

type DropDownDirection = 'top' | 'bottom'

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
  bottom: cls.optionsBottom,
  top: cls.optionsTop
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
    direction = 'bottom'
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
                  {selected && '!!!'}
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
