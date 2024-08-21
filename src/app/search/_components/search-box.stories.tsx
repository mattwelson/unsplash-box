import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SearchBox } from "./search-box";

const meta = {
  component: SearchBox,
} satisfies Meta<typeof SearchBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
};
