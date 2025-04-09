import type { Meta, StoryObj } from "@storybook/react";
import SlideOverlay from "./index";

const meta = {
  title: "Components/SlideOverlay 滑动覆盖组件",
  component: SlideOverlay,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SlideOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "一个可以上下滑动的覆盖组件。",
      },
    },
  },
};
