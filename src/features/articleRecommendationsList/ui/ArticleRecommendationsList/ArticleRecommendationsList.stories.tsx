import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationList/ArticleRecommendationList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) =>
  <ArticleRecommendationsList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
