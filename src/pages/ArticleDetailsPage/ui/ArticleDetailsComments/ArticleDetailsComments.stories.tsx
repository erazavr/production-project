import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import { ArticleDetailsComments } from './ArticleDetailsComments'

export default {
  title: 'pages/ArticleDetailsComments/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleDetailsComments>

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) =>
  <ArticleDetailsComments {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
