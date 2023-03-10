import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text, TextVariant } from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
  text: 'Text'
}

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
  title: 'Title'
}

export const OnlyText = Template.bind({})
OnlyText.args = {
  text: 'Text'
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
  title: 'Title',
  text: 'Text'
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = {
  title: 'Title'
}
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = {
  text: 'Text'
}
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Error = Template.bind({})
Error.args = {
  text: 'Text',
  title: 'TItle',
  variant: TextVariant.ERROR
}
