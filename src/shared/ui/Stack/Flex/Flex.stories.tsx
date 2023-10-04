import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';
import { Text } from '../../Text/Text';

import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = args => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  gap: '4',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  gap: '8',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  gap: '32',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  gap: '4',
  direction: 'column',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  gap: '8',
  direction: 'column',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  gap: '16',
  direction: 'column',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  gap: '32',
  direction: 'column',
  children: (
    <>
      <Text text={'TEST'} />
      <Text text={'TEST'} />
      <Text text={'TEST'} />
    </>
  ),
};
