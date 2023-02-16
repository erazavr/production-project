import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import React from 'react'
import {
  ThemeDecorator
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Button, VariantButton } from './Button'

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button'
}

export const Clear = Template.bind({})
Clear.args = {
  children: 'Button',
  variant: VariantButton.CLEAR
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Button',
  variant: VariantButton.OUTLINE
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
  children: 'Button',
  variant: VariantButton.OUTLINE
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]
