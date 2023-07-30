import { Theme } from '@/shared/const/theme'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import {
  ThemeDecorator
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Header } from './Header'

export default {
  title: 'widgets/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]

export const AuthHeader = Template.bind({})
AuthHeader.args = {}
AuthHeader.decorators = [StoreDecorator({
  user: {
    authData: {}
  }
})]
