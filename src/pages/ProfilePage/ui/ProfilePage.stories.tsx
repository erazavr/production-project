import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import Avatar from '@/shared/assets/test/storybook.jpeg'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ProfilePage from './ProfilePage'
import React from 'react'
import {
  ThemeDecorator
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage />

export const Normal = Template.bind({})
Normal.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'Ernie',
      age: 21,
      country: Country.Kyrgyzstan,
      first: 'Ernur',
      lastname: 'Kurmanbekov',
      city: 'Bishkek',
      currency: Currency.KGS,
      avatar: Avatar
    }
  }
})]

export const Dark = Template.bind({})
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'Ernie',
      age: 21,
      country: Country.Kyrgyzstan,
      first: 'Ernur',
      lastname: 'Kurmanbekov',
      city: 'Bishkek',
      currency: Currency.KGS,
      avatar: Avatar
    }
  }
})]
