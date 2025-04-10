import type { Meta, StoryObj } from "@storybook/react";
import { Zoom } from "./index";

const meta = {
  title: "Components/Zoom 镜头推拉",
  component: Zoom,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Zoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "模仿镜头推拉的动画效果",
      },
    },
  },
};
