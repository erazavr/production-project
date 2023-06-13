import { Listbox as HListBox } from '@headlessui/react'
import { type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { type DropDownDirection } from 'shared/types/ui'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../Stack'
import { mapDirectionClasses } from '../../styles/consts'
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'

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
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
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
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled
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
