import type { Meta, StoryObj } from "@storybook/react";
import { BorderWithRadiusAndGradient } from "./index";

const meta = {
  title: "Components/BorderWithRadiusAndGradient",
  component: BorderWithRadiusAndGradient,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "这个元素有一个渐变效果的边框和一个圆角",
  },
} satisfies Meta<typeof BorderWithRadiusAndGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "带有渐变边框和圆角的组件，默认状态",
      },
    },
  },
};
