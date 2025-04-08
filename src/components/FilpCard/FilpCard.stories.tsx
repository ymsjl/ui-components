import type { Meta, StoryObj } from "@storybook/react";
import { FilpCard } from "./index";
import avatarImageUrl from "./image/avatar.jpg";
import "./FilpCard.stories.css";

const texts = [
  "窗外的麻雀 在電線桿上多嘴",
  "妳說這一句 很有夏天的感覺",
  "手中的鉛筆 在紙上來來回回",
  "我用幾行字形容妳是我的誰",
  "秋刀魚 的滋味 貓跟妳都想了解",
  "初戀的香味就這樣被我們尋回",
  "那溫暖 的陽光 像剛摘的鮮豔草莓",
  "你說妳捨不得吃掉這一種感覺",
  "雨下整夜 我的愛溢出就像雨水",
  "院子落葉 跟我的思念厚厚一疊",
  "幾句是非 也無法將我的熱情冷卻",
  "妳出現在我詩的每一頁",
];

const meta: Meta<typeof FilpCard> = {
  title: "Components/FilpCard",
  component: FilpCard,
  args: {
    frontSurfaceRender: () => (
      <>
        <div className="c-card__text-wrapper">
          <div className="c-card__title">每日歌词</div>
          <div className="c-card__desc">
            {texts.map((text, index) => (
              <>
                {text}
                <br />
              </>
            ))}
          </div>
          <div className="c-card__source">《七里香》——周杰伦</div>
        </div>
        <div className="c-card__image-wrapper">
          <img
            className="c-card__avatar-image"
            src={avatarImageUrl}
            alt="avatar"
          />
        </div>
      </>
    ),
    backSurfaceRender: () => (
      <div className="c-card__text-wrapper c-card__text-wrapper--back">
        <div className="c-card__title">每日歌词</div>
        <div className="c-card__desc c-card__desc--back">
          {texts.map((text, index) => (
            <>
              {text}
              <br />
            </>
          ))}
        </div>
        <div className="c-card__source">《七里香》——周杰伦</div>
      </div>
    ),
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilpCard>;

export const Default: Story = {};
