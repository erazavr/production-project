import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { NotFoundPage } from './NotFoundPage'
import React from 'react'
import {
  ThemeDecorator
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotFoundPage>

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage />

export const Light = Template.bind({})
export const Dark = Template.bind({})
Dark.decorators = [ThemeDecorator(Theme.DARK)]
