import { Theme } from '@/shared/const/theme';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotFoundPage } from './NotFoundPage';
import React from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = args => <NotFoundPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Light.decorators = [StoreDecorator({})];
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
