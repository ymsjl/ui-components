import type { Meta, StoryObj } from "@storybook/react";
import { OverScroll } from "./index";
import { useState } from "react";
import "./OverScroll.stories.css"; // 引入样式文件

const meta = {
  title: "Components/OverScroll 超出滚动",
  component: OverScroll,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    innerClassName: { control: "text" },
    onScrollOverUp: { action: "scrolled over up" },
    onScrollOverDown: { action: "scrolled over down" },
    disableScroll: { control: "boolean" },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OverScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

// 创建一些示例内容
const ExampleContent = () => (
  <ul>
    {Array(20)
      .fill(null)
      .map((_, index) => (
        <li key={index} style={{ padding: "20px", fontSize: "16px" }}>
          列表项 {index + 1}
        </li>
      ))}
  </ul>
);

export const Default: Story = {
  args: {
    className: "custom-wrapper",
    innerClassName: "custom-inner",
    children: <ExampleContent />,
  },
  render: (args) => {
    const [message, setMessage] = useState("");

    const handleScrollOverUp = () => {
      setMessage("触发了向上超出滚动！");
      setTimeout(() => setMessage(""), 2000);
    };

    const handleScrollOverDown = () => {
      setMessage("触发了向下超出滚动！");
      setTimeout(() => setMessage(""), 2000);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
            marginBottom: "10px",
            minHeight: "30px",
          }}
        >
          {message ? message : "向上或向下超出滚动可以查看效果"}
        </div>
        <OverScroll
          {...args}
          onScrollOverUp={handleScrollOverUp}
          onScrollOverDown={handleScrollOverDown}
        >
          <ExampleContent />
        </OverScroll>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "一个能够让内容滚动到尽头依然能够滚动一段距离，并且附带回弹效果的滚动组件，类似移动设备上触摸滚动到底部的弹性效果。",
      },
    },
  },
};
