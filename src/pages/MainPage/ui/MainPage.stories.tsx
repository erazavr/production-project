import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { Normal } from '@/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.stories'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import MainPage from './MainPage'
import React from 'react'
import {
  ThemeDecorator
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

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
