/** 啤酒事务局 · 项目页活动外链 */

export type BeerMattersActivityLink = {
  label: string;
  url: string;
};

export type BeerMattersHighlight = {
  title: string;
  links: BeerMattersActivityLink[];
};

export const beerMattersHighlights: BeerMattersHighlight[] = [
  {
    title: "啤酒旅行社 · 皖南行",
    links: [
      {
        label: "招募",
        url: "https://mp.weixin.qq.com/s/1cyNHpXDm8sWVhEQvp7M-A",
      },
      {
        label: "回顾",
        url: "https://mp.weixin.qq.com/s/lCJSoFpbspBQKWNweeGYUw",
      },
    ],
  },
  {
    title: "啤酒旅行社 · 香港 48 小时",
    links: [
      {
        label: "招募",
        url: "https://mp.weixin.qq.com/s/bQCvrfoQxtNxaE5bAKOqFQ",
      },
      {
        label: "回顾",
        url: "https://mp.weixin.qq.com/s/NxXByhYe80I1cVBWcdYDdQ",
      },
    ],
  },
  {
    title: "啤酒旅行社 · 宁夏贺兰山",
    links: [
      {
        label: "招募 · 一起去宁夏喝葡萄酒",
        url: "https://mp.weixin.qq.com/s/VvC5yK3I_tT7hF5Zrxl5rQ",
      },
      {
        label: "回顾",
        url: "https://mp.weixin.qq.com/s/KjRdOAmxn-5lKyBe052GZw",
      },
    ],
  },
];
