import type { Meta, StoryObj } from "@storybook/react";
import { SwipeoutAction } from "./index";
import "./SwipeoutAction.stories.css";

const BUTTON_CLASSES = {
  YELLOW: "bg-yellow",
  BLUE: "bg-blue",
  RED: "bg-red",
} as const;

const BUTTON_TEXTS = {
  DELETE: "删除",
  MORE: "更多",
  MARK: "标记",
} as const;

const ALERT_MESSAGES = {
  DELETED: "已删除",
  MORE: "更多操作",
  MARKED: "已标记",
} as const;

const SAMPLE_TEXT =
  "雨下整夜我的爱溢出就像雨水，窗台蝴蝶像诗里纷飞的美丽章节。我接着写把永远爱你写进诗的结尾，你是我唯一想要的了解。";

const DELETE_BUTTON_PROPS = {
  className: BUTTON_CLASSES.RED,
  text: BUTTON_TEXTS.DELETE,
  onClick: () => {
    alert(ALERT_MESSAGES.DELETED);
  },
};
const MARK_BUTTON_PROPS = {
  className: BUTTON_CLASSES.YELLOW,
  text: BUTTON_TEXTS.MARK,
  onClick: () => {
    alert(ALERT_MESSAGES.MARKED);
  },
};
const MORE_BUTTON_PROPS = {
  className: BUTTON_CLASSES.BLUE,
  text: BUTTON_TEXTS.MORE,
  onClick: () => {
    alert(ALERT_MESSAGES.MORE);
  },
};

const meta = {
  title: "Components/SwipeoutAction 滑动操作",
  component: SwipeoutAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: SAMPLE_TEXT,
  },
} satisfies Meta<typeof SwipeoutAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAction: Story = {
  args: {
    children: SAMPLE_TEXT,
  },
  parameters: {
    docs: {
      description: {
        story: "SwipeoutAction 组件的默认状态，没有任何操作按钮。",
      },
    },
  },
};

export const RightAction: Story = {
  args: {
    rightBtnsProps: [DELETE_BUTTON_PROPS],
  },
  parameters: {
    docs: {
      description: {
        story: "右划会拖出一个删除按钮",
      },
    },
  },
};

export const LeftAction: Story = {
  args: {
    leftBtnsProps: [MARK_BUTTON_PROPS],
  },
  parameters: {
    docs: {
      description: {
        story: "左划会拖出一个标记按钮",
      },
    },
  },
};

export const BothSidesActions: Story = {
  args: {
    leftBtnsProps: [MARK_BUTTON_PROPS],
    rightBtnsProps: [DELETE_BUTTON_PROPS],
  },
  parameters: {
    docs: {
      description: {
        story: "左右划都会拖出按钮",
      },
    },
  },
};

export const MultipleRightButtons: Story = {
  args: {
    rightBtnsProps: [MARK_BUTTON_PROPS, MORE_BUTTON_PROPS, DELETE_BUTTON_PROPS],
  },
  parameters: {
    docs: {
      description: {
        story: "右侧有多个按钮。",
      },
    },
  },
};

export const MultipleBothSidesButtons: Story = {
  args: {
    leftBtnsProps: [DELETE_BUTTON_PROPS, MORE_BUTTON_PROPS, MARK_BUTTON_PROPS],
    rightBtnsProps: [MARK_BUTTON_PROPS, MORE_BUTTON_PROPS, DELETE_BUTTON_PROPS],
  },
  parameters: {
    docs: {
      description: {
        story: "左右两侧都有多个按钮。",
      },
    },
  },
};
