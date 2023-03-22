import { type AddCommentFormProps } from 'features/addCommentForm/ui/AddCommentForm/AddCommentForm'
import { type FC, lazy } from 'react'

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(async () => await new Promise((resolve) => {
  setTimeout(() => {
    resolve(import('./AddCommentForm'))
  }, 1500)
}))
