import type { LText } from "./demo-data";

/** 项目详情正文（双语）。优先于 content/demo/projects/*.mdx */
export const demoProjectBodies: Record<string, LText> = {
  "yakushima-bus-now": {
    zh: `因自己上岛查交通处处碰壁，做了 [yakushimabus.com](https://yakushimabus.com)——面向屋久岛旅行者的免费信息工具，也是我的第一个 vibe coding 项目。

前不久一个人去了屋久岛——日本九州南部的一个小岛，1993 年和白神山地一起成为日本首批世界自然遗产。上千年的屋久杉、90% 覆盖率的森林、一个月里有 35 天下雨。我备着 18kg 的包，计划徒步和露营。

岛上的巴士是进山、下山、换线的唯一方式，但时刻表信息散落在旅游局 PDF、日语博客、过期网页里，对外国游客几乎是噩梦。山里信号差，离线查不了，日语不好的人基本只能靠猜。

于是我做了这个工具：按站点和时间快速查询班次，三语切换（中 / 英 / 日），静态部署，弱网也能打开——在没有信号的山里也能用。从零到上线全程 vibe coding，配套 SEO 自动化报表，把一个真实的麻烦变成别人能用的工具。上线后自然流量持续增长，计划延伸成「日本离岛巴士」系列。

## 迭代时间线

| 日期 | 更新 |
|------|------|
| 5/20 | 产品上线：公交时刻表、价格计算、船运信息；接入 GA4 / GSC |
| 5/21–22 | PDF / 手机预览优化；SEO 日报自动化 |
| 5/25 | 日报 v2、站点监控告警 |
| 6/9 | 日文 SEO、FAQ、产品介绍页 |
| 6/25 | 登山路线及 YAMAP 链接、公交站点、商店、药店、自然风光等地图（92 处地点） |

## 功能介绍

### 公交时刻表

- **区间查询**：支持选定出发站与到达站，列出当日全部班次
- **下一班高亮**：自动标出最近一班未发车班次，以及倒计时
- **日期切换**：平日 / 周六 / 节假日
- **时间筛选**：可选仅显示指定时刻「之后」的班次，方便看当天或其他时段全天车次
- **常用区间快捷筛选**：宫之浦港↔安房、自然馆、白谷、荒川等一键填入
- **运营公司标识**：种屋交通 / 松ばんだ等分色区分，便于区分是否可用岛上多日乘车券

### 路线图与票价

- **区间票价查询**：选择起点和终点，即可看到票价预估
- **景点与公交衔接**：主要观光点对应乘车说明
- **乘车券信息**：乘车券价格与发售点，可跳转 Google 地图

### 船运 · 上岛

- **船运信息**：鹿儿岛↔屋久岛高速船（Toppy/Rocket）与渡轮时间表，购票方式，机场联络巴士与上岛衔接说明
- **公告**：运休与公告（如渡轮季节性停运）

### 便利设施地图

- **分类 POI 地图**：名胜、温泉、海滩、纪念品、超市、药店、ATM、户外租赁等（90+ 点位）
- **三语名称与简介**，一键 Google 地图导航
- **核实公交站图层**：与时刻表同源，可点站查班次
- **无障碍厕所**等信息外链

### 登山参考

- **观光协会代表路线**：绳文杉、太鼓岩、宫之浦岳等
- **难度、距离、用时**参考与官方 / YAMAP 链接

### 其他说明

- **三语界面**：日 / 中 / 英，语言偏好本地记忆
- **移动优先**：弱网场景可静态加载，无需登录
- **数据说明**：非实时 GPS，以官方公告与站牌为准`,
    en: `After hitting wall after wall trying to figure out transit on the island, I built [yakushimabus.com](https://yakushimabus.com)—a free information tool for Yakushima travelers, and my first vibe coding project.

I went solo to Yakushima—a small island south of Kyushu, among Japan's first UNESCO World Heritage sites alongside Shirakami-Sanchi. Ancient cedar forests, 90% tree cover, rain on 35 days a month. I packed an 18 kg bag for backpacking and camping.

The bus is how you get into the mountains, back down, and connect between trailheads—but timetables live in tourism PDFs, Japanese blogs, and dead links. For visitors who don't read Japanese, it's a nightmare. Signal drops in the mountains; offline lookup is impossible; you mostly guess.

So I built this tool: search by stop and time, trilingual UI (Chinese / English / Japanese), static hosting that works on weak networks—usable even where there's no signal. Built end-to-end with vibe coding, plus automated SEO reporting, turning a real headache into something others can use. Organic traffic keeps growing; the plan is a "Japan island bus" series.

## Release timeline

| Date | Update |
|------|--------|
| May 20 | Launch: bus timetables, fare calculator, ferry info; GA4 / GSC |
| May 21–22 | PDF / mobile preview polish; automated SEO daily report |
| May 25 | Daily report v2, site monitoring alerts |
| Jun 9 | Japanese SEO, FAQ, product intro page |
| Jun 25 | Hiking routes & YAMAP links, bus stops, shops, pharmacies, nature POIs (92 places) |

## Features

### Bus timetables

- **Route search**: pick origin and destination, see all departures for the day
- **Next bus highlight**: nearest upcoming departure with countdown
- **Day type**: weekday / Saturday / holiday
- **Time filter**: show only departures after a chosen time
- **Quick routes**: Miyanoura Port↔Anbo, Nature Museum, Shiratani, Arakawa, etc.
- **Operator colors**: Tane Yū Kōtsū / Matsubanda and pass eligibility at a glance

### Routes & fares

- **Fare estimate** between two stops
- **Sightseeing ↔ bus** notes for major spots
- **Pass info**: prices, sales points, Google Maps links

### Ferry · getting there

- **Schedules**: Kagoshima↔Yakushima high-speed (Toppy/Rocket) and car ferry, tickets, airport bus connections
- **Notices**: suspensions and seasonal changes

### POI map

- **Categories**: sights, onsen, beaches, souvenirs, supermarkets, pharmacies, ATMs, outdoor rentals (90+ points)
- **Trilingual names & blurbs**, one-tap Google Maps
- **Verified bus stop layer** synced with timetables
- **Accessible toilets** and other external links

### Hiking reference

- **Official routes**: Jomon Sugi, Taiko-iwa, Miyanoura-dake, etc.
- **Difficulty, distance, time** with official / YAMAP links

### Other notes

- **Trilingual UI**: Japanese / Chinese / English, preference saved locally
- **Mobile-first**: static load for weak networks, no login
- **Data disclaimer**: not live GPS; follow official notices and on-site signs`,
  },
};
