import { type AddCommentFormProps } from 'features/addCommentForm/ui/AddCommentForm/AddCommentForm'
import { type FC, lazy } from 'react'

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(async () => await import('./AddCommentForm'))
