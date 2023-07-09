import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import MainPage from './MainPage'

export default {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof MainPage>

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage />

export const Light = Template.bind({})
export const Dark = Template.bind({})
Light.decorators = [StoreDecorator({})]
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
