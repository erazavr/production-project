import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { CommentCard } from './CommentCard'

export default {
  title: 'features/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}