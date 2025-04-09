import type { Meta, StoryObj } from "@storybook/react";
import { Moving } from "./Moving";

const meta = {
  title: "Components/Moving 可移动组件",
  component: Moving,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Moving>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "一个可以拖动的组件。",
      },
    },
  },
};
