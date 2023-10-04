import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import React from 'react';
import { ProfileCard } from './ProfileCard';
import Avatar from '@/shared/assets/test/storybook.jpeg';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = args => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'Ernie',
    age: 21,
    country: Country.Kyrgyzstan,
    first: 'Ernur',
    lastname: 'Kurmanbekov',
    city: 'Bishkek',
    currency: Currency.KGS,
    avatar: Avatar,
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'error',
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  isLoading: true,
};
