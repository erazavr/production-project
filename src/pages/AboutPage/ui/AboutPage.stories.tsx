import { Theme } from '@/shared/const/theme';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AboutPage from './AboutPage';
import React from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = args => <AboutPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Light.decorators = [StoreDecorator({})];
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
