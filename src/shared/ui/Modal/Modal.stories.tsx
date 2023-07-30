import { Theme } from '@/shared/const/theme'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Modal } from './Modal'

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />
export const Light = Template.bind({})
Light.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid culpa cumque deleniti excepturi inventore natus nihil quibusdam quis, sapiente vero?',
  isOpen: true
}
export const Dark = Template.bind({})
Dark.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid culpa cumque deleniti excepturi inventore natus nihil quibusdam quis, sapiente vero?',
  isOpen: true
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
