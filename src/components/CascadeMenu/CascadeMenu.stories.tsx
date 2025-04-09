import type { Meta, StoryObj } from "@storybook/react";
import CascadeMenu from ".";
import { NavItemRender } from "./Nav";
import { SectionItemRender } from "./Content";
import "./CascadeMenu.stories.css";

const sectionsLenght = 20;

const sectionsData = Array.from({ length: sectionsLenght }).map((_, index) => ({
  title: `这是这一节的标题-${index}`,
  shortName: `标题-${index}`,
  id: index,
  data: [
    {
      id: 1,
      name: "Hey Kong",
      desc: "他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？",
    },
    {
      id: 2,
      name: "Hey Kong",
      desc: "他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？",
    },
    {
      id: 3,
      name: "Hey Kong",
      desc: "他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？",
    },
    {
      id: 4,
      name: "Hey Kong",
      desc: "他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？",
    },
  ],
}));

type SectionItem = (typeof sectionsData)[number];

const sectionItemRender: SectionItemRender = (item:SectionItem, index) => (
  <>
    <header className="sectionHeader">{item.title}</header>
    <div className="sectionBody">
      <ul className="sectionList">
        {item.data.map(({ id, name, desc }) => (
          <li key={id}>
            <div className="listItemContainer">
              <div className="thumbnailContainer"></div>
              <div>
                <div className="listItemName">{name}</div>
                <p className="listItemDesc">{desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);

const navItemRender: NavItemRender = (item: SectionItem, index, isActived) => (
  <div className={`navItem ${isActived && "navItemActived"}`}>
    {item.shortName}
  </div>
);

const meta = {
  title: "Components/CascadeMenu 级联菜单",
  component: CascadeMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof CascadeMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sectionItemRender: sectionItemRender,
    navItemRender: navItemRender,
    sections: sectionsData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "列表级联菜单滚动，内容列表区域滚动，导航区域也随之滚动到可视范围内的的第一个章节对应的导航条目。",
      },
    },
    layout: "fullscreen",
  },
};
