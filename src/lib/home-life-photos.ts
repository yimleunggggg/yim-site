/** 首页生活照走马灯 — 换图只改这里 */
export type HomeLifePhoto = {
  src: string;
  label: { zh: string; en: string };
};

export const homeLifePhotos: HomeLifePhoto[] = [
  { src: "/life/moments/surf-cafe/01.jpg", label: { zh: "冲浪", en: "Surf" } },
  { src: "/life/moments/sup-malaysia/01.jpg", label: { zh: "浆板", en: "SUP" } },
  { src: "/life/moments/xterra/01.jpg", label: { zh: "越野跑", en: "Trail" } },
  { src: "/life/moments/spartan/01.jpg", label: { zh: "斯巴达", en: "Spartan" } },
  { src: "/life/moments/hoka-trail/01.jpg", label: { zh: "野外跑", en: "Trail run" } },
  { src: "/life/moments/hoka-trail/02.jpg", label: { zh: "HOKA 越野", en: "HOKA trail" } },
  { src: "/life/moments/japan-camp/01.jpg", label: { zh: "露营", en: "Camping" } },
  { src: "/life/moments/sichuan/01.jpg", label: { zh: "徒步", en: "Hiking" } },
  { src: "/life/moments/lamma/01.png", label: { zh: "南丫岛", en: "Lamma" } },
  { src: "/life/moments/pa-pae/01.jpg", label: { zh: "禅修", en: "Retreat" } },
  { src: "/life/moments/bishan-fest/01.jpg", label: { zh: "精酿局", en: "Craft beer" } },
  { src: "/life/moments/brewery-jiaxing/01.jpg", label: { zh: "酒厂", en: "Brewery" } },
];
