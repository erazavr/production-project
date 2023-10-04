import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { RatingCard } from './RatingCard';

export default {
  title: 'entities/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = args => (
  <RatingCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
