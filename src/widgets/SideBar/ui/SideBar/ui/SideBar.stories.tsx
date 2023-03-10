import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import React from 'react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import {
  ThemeDecorator
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { SideBar } from './SideBar'

export default {
  title: 'widgets/SideBar',
  component: SideBar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof SideBar>

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({
  user: { authData: {} }
})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: { authData: {} }
})]

export const NoAuth = Template.bind({})
NoAuth.args = {}
NoAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: {}
})]
