import {
  type ChangeEvent,
  type InputHTMLAttributes,
  memo, type MutableRefObject,
  type SyntheticEvent, useEffect, useRef,
  useState
} from 'react'
import { type Omit } from 'react-redux'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'

import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autoFocus?: boolean
  readonly?: boolean
}

export const Input = memo(function Input (props: InputProps) {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    readonly,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  const ref = useRef() as MutableRefObject<HTMLInputElement>

  const isCaretVisible = isFocused && !readonly

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true)
      ref.current.focus()
    }
  }, [autoFocus])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
    setCaretPosition(event.target.value.length || 0)
  }

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)
  const onSelect = (event: SyntheticEvent<HTMLDivElement, Event>) => {
    if (event.target instanceof HTMLInputElement) {
      setCaretPosition(event?.target?.selectionStart || 0)
    }
  }

  const mods: Mods = {
    [cls.readonly]: readonly
  }
  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder &&
        <div className={cls.placeholder}>
          {`${placeholder} >`}
        </div>
      }

      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          autoFocus
          {...rest}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          readOnly={readonly}
        />
        {isCaretVisible && <span className={cls.caret} style={{ left: caretPosition * 10 }}/>}
      </div>
    </div>
  )
})
