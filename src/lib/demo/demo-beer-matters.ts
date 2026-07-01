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
    title: "啤酒旅行社 · 香港 48 小时",
    links: [
      {
        label: "招募 · 48小时解锁香港精酿",
        url: "https://mp.weixin.qq.com/s/bQCvrfoQxtNxaE5bAKOqFQ",
      },
      {
        label: "回顾 · 香港暴走48小时酒后实录",
        url: "https://mp.weixin.qq.com/s/NxXByhYe80I1cVBWcdYDdQ",
      },
    ],
  },
];
