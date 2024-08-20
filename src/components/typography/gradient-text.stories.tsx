import type { Meta, StoryObj } from '@storybook/react';

import { GradientText } from './gradient-text';

const meta = {
  component: GradientText,
} satisfies Meta<typeof GradientText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "children"
  }
};