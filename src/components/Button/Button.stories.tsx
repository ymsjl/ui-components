import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: '按钮',
  },
};

export const Secondary: Story = {
  args: {
    label: '按钮',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: '按钮',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: '按钮',
  },
};