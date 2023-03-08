import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import ProfilePage from './ProfilePage'
import React from 'react'
import {
  ThemeDecorator
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage />

export const Light = Template.bind({})
Light.decorators = [StoreDecorator({})]
export const Dark = Template.bind({})
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]