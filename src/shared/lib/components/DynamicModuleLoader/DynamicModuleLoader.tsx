import { type Reducer } from '@reduxjs/toolkit'
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { type StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { type ReactNode, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

type ReducersListEntries = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  children: ReactNode
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount } = props
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useDispatch()

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntries) => {
      store.reducerManager.add(name, reducer)
      dispatch({ type: `@INIT ${name} reducer` })
    })
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]: ReducersListEntries) => {
          store.reducerManager.remove(name)
          dispatch({ type: `@DESTROY ${name} from reducer` })
        })
      }
    }

    // eslint-disable-next-line
  }, [])
  return (
    <>
      {children}
    </>
  )
}
