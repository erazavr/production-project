import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { counterActions } from '../model/slice/counterSlice'

interface CounterProps {
  className?: string
}

export const Counter = ({ className }: CounterProps) => {
  const { t } = useTranslation()
  const counterValue = useSelector(getCounterValue)
  const dispatch = useDispatch()
  const increment = () => {
    dispatch(counterActions.increment())
  }
  const decrement = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div className={classNames('', {}, [className])}>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button data-testid='increment-btn' onClick={increment}>{t('increment')}</Button>
      <Button data-testid='decrement-btn' onClick={decrement}>{t('decrement')}</Button>
    </div>
  )
}
