import { lazy } from 'react'

export const ProfilePageAsync = lazy(async () => await new Promise((resolve) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  setTimeout(() => { resolve(import('./ProfilePage')) }, 1500)
}))
