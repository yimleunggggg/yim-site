#!/usr/bin/env node
/**
 * 一次性：从微信公众号拉取香港行招募/回顾配图到 public/
 * 运行：node scripts/import-beer-hk-wechat-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const ARTICLES = {
  recruit: [
    "https://mmbiz.qpic.cn/mmbiz_gif/X4KuerPfUjWXboNauTxWlyWg1nn8oOPtYZBUJ6gTicibmI61RicbtyapfI5wicRnnAgmLRItqWJcTClRgUbbamXIdg/640?wx_fmt=gif",
    "https://mmbiz.qpic.cn/mmbiz_gif/X4KuerPfUjWXboNauTxWlyWg1nn8oOPtne5jkSKmQthRI5h2PaYG3BN2jtXMlKJ2wyCw8B7nAsMBvKde0fDq5g/640?wx_fmt=gif",
    "https://mmbiz.qpic.cn/mmbiz_png/X4KuerPfUjXGNmicHNNdiaH9RUJcZ1QibcMFUwnbWN7GdK2CtfIymEHuBibhLjwScWKoIxkRRO6I47ancRApgauSFw/640?wx_fmt=png",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreD2rr5B9xa7Eb2FVoEfy3ia2IgribMgYocN74BJMB8dcPibS98w98bBuLw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4Xre2BLdK284lc59EepHib3b4ngke1lRDxM3Ra6kUXeKZia59M3feEbchIcA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4Xre5hFXrPN3sSQ4wbENcOH3jm52PI3fjsITzIrTe8O8oA67MKu5xv07Ew/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreSKjh5h1DTcfglG9O943sLek6SPprOMsFKADILw8tBdSHtGw5bOqx3g/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreHB5NaHDkaaquBtFYXJH2KrEXMFknjic4txodkVZh9fYNFZBzbxbaEZA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreKiciblceqORpyMibNP1OEs5vM3ibca5xuxica9ObShYahfUTpicINgHK7K7g/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4Xredbo0IxZra9leYCiaMGt4IvpVvicOPX1WYscx10fqnQhur2eSm3u7R6ibg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreXbC41R7ngOsicqZVpr3Bqy0KQJ6bjB3vx2PMXZPS8q9y1n5agiahSUeg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreJ2aED5bwNzKk70QIPAaGOSazopOCibWKE5D8XVJzyOcosb2OV8qwtdA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4Xrec1qVFxLzpicrJqHaK2e5adMk5W6KIpchmNnRvk2abbvaMvX0Hnlj68w/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XrezF9PpugSwtVMGIJia24Yg2kr5DXgh24l4aicQIyPib206K57PR36lVmRQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XredYficRg1Kjol5C3mDv12KfHHT0PvoLKViaX3jRZzmicWgSaQq4wueY4zg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreO4HLouxbibib5Nw3fqqpSoWfCLUzt4sfSCXqgIbjU9vSwdiaZiaibnCqW3w/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreMfYxmoQ7AbYXbdKricTj7OUQhsm3f5UH0Arqjyam6iaoibXvj19562OKw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XrepLDANpQNiaibiavAaMnn035JGg4hhzsscDtcUaTL4943Zj9y6yic74S37A/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreB2ghfym8rQMwdDhrDoD8lJys16UAlA1QA5dOahOWsGWIZ8siasVXZzQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreGGPSciczxuSXibG9Q2Je1OAkJpoZcr6JRiclnIhSuTDBc4Yc2J80DLMWw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreJFTYRk1345P9SA0icCse8iaiadU8qA6u3KdVQyiac6E5VMOpDOzTNbKA3Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreZFmNTib3wep5ny5Ve19xAZQjAc6QPXyOqI8ibwqJicr7ia58awCFIibw6gQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreYUpBZmmxLYbrzKN5h3TrsT5k6vMgOxBBic1VicCZtDJz504XA0ytZK4g/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjWKqLScYqMJjeLibnr1p4XreRKfclUfzls3tlwTMq7t4iaKM0hpurZ6oefk3aiaSmib2nbYkwRicNuEZDQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXjGVD3dFsLInibHt1GgXmdRPy2PhskapM09t3Tos5IbZ6UctvWMlCFX5OkERWEeNSYUPjUIdMWGwA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXjGVD3dFsLInibHt1GgXmdRjIoNppGKCUJxUcQ7SPyhhSAvuN9snmCLkstiaJRtrjuhcXLDjkiaWApg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXq2XJszY2EIeR5WWv5oJTIFjjeMCXLaLXyasGqNVOBYjoEPe3x9rm1QiamcmNcYFXrO2fIhsBbnFw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXq2XJszY2EIeR5WWv5oJTIwJ5wKLrIcLhibrxp4KHs2JqPicWDS045ibX9CDbxaTljibVFzWic83BQNqw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjV61cib0CW17rG8O4kZ4XEibR3aVrLicyA6RHiaBjAWuibWv14OvBwCHoN65ibUwicrS2jscyB44ianMDYq9A/640?wx_fmt=jpeg",
  ],
  recap: [
    "https://mmbiz.qpic.cn/mmbiz_gif/X4KuerPfUjWXboNauTxWlyWg1nn8oOPtYZBUJ6gTicibmI61RicbtyapfI5wicRnnAgmLRItqWJcTClRgUbbamXIdg/640?wx_fmt=gif",
    "https://mmbiz.qpic.cn/mmbiz_gif/X4KuerPfUjWXboNauTxWlyWg1nn8oOPtne5jkSKmQthRI5h2PaYG3BN2jtXMlKJ2wyCw8B7nAsMBvKde0fDq5g/640?wx_fmt=gif",
    "https://mmbiz.qpic.cn/mmbiz_png/X4KuerPfUjXGNmicHNNdiaH9RUJcZ1QibcMFUwnbWN7GdK2CtfIymEHuBibhLjwScWKoIxkRRO6I47ancRApgauSFw/640?wx_fmt=png",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicx62icJ9jJVQXc9oWblephptLKbiccuyPRcJjPkd22o0OtCsIebRm56AA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicjxuBtZ1aXdiaeTTUr649cFic7Tq3ZDcw15vnEovqsIa08D6RicnygaV1Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic19GM9e9OjNQYib6CSq8H8XfTeDZkoUqyIPib5uSJnjZgA6HonbyJPfpw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicJF4ibibDMmMQv9m0HiamIV1xfsiaAjTdd7PN309Qsk8B0Vf1PSiaJ9q8UNA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicCCeial4yGC9GZmWiaXWoNyDyicOBpvJibEYJLCiaYNoIXW8EqQiay8UAGUyg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeich5l5xSjbJDnzQfZ6rxkiaLyOq32WNxiapCWs7uMt1F9v9Xo2kNdhicfTg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicXrq33eGazWRbyPwLiaJU5Yg2X4oCWcWwh2zk0ibGeYmX1wQRibM49la8A/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicubict5bY3ryWkIq9icbDfEen8FgcoPokianibdPtgpUpUYxy6tajuwB5tw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic1BTziaXfvalUvSria3RhyiabRUb0OHjRA0w00hOEdslib4mkOlf8mPP4Qw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicz54hzAWKbwPyMOVmzqJQ39EDUMNbmUAicp1eBemfuN8RKG1Qsr7Zj0Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicgvSr5nOuKAyTzxxicz0C0zjEt3Ml9QQViciaYsqF1NtMh0npZSWdLkpQg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicmF9HRjPIV1Ey1NPmfdyT15OEZen1DUWJCJ7AibO5FMxE7wicGk9mgQtg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicZGrmVdV3K5El0Kho0ibfL53ibJiczx0CVhqErdyFx0hQG2hjMuKDgh4ow/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicKg8evKahuMUy5OO4UfQaUEVKz8FvB3DlXRncu2sATIibXTrhXTlfPBg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicmdJetNr7POQfRHavzcUoy4Y3YkXnVk9l9JubGQibmBskNe1gtYvibNyg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicXmypEMnqhdAqUWYECGFd1nJJYhZ2jLia9AYaKD7ic9lu5xQ7ZJ5QU7ZQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicRsDtBrTMEbIAB4DFgb0ib0DMZIYEqT3ZoZZCsQD9kHP1zlXHHsDQn2A/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeickCGGGWws0F3srj3tI231XB278rYiaIoZqwhGU7D3MHQ9tQpuVbIuk7A/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeiciard99yT99tumPiaicVbqPteZakhFvbUPCZvernkoOO7YwEMFOcrKX7EA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic7G0dzfkiauKWdBB2HLBT2ib7rorWfmaLVSIhq4h54lV1II3IiaJsiaEFLA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicIJXzTqexggFyLKCl4jzPFoSLLyfwsuzM3T9qgWXtrpgQ4QVjcPTD8Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeiciaxR1YMCFVBciahImDwjYklDfF3C01gGojLdtGAGp4UXKXcUXaPQuChg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicrialPPa70gZf8qnONcksFC1LStwFoGrkwZ6GOrxCic2JufGiaEo135o7Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicyNvYUNSwcoEy9YiaAhC3yJAobQicmSAVos6Z4mQUQarLPufKOAvxVTvQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicyDw28cJeYVDjXyGtWPXsNicfQv7JmWh0MTjEtKJymthttstic0cicsRKw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic1corCueygTibQGgxicGBPx16iccWVbuNpjWsOgs2kic47eGXk3X3YoibpXw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicMKiaUd2oj5LCUe3ggQno482VWXb1ycmyqJMKiajmXe1bLaeicNIs04prg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicqIszcP6VGbNLoO86573XawgqYCM3vUMdQjOcZTkiawwGoMw4t9vWH4A/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeics7Zd13H822YMO2w0Zia9M6dTibwf0r8CNgEZnwCm5U77GvBHrHibTicn5Q/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicUv82WIxib5esYy8ic5Eatkgoa2SrOYVw4vvzhddl77TiaCWEKZsSMRzBQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicib7vHY1uNEUibga837xxzPdicGcqSPCC8mxt4tc17ic4HdsSgZDQFqPLPQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicCBKWlsY5zhbjoWbrKPo8LbDFdzLqDlsnCRPgXgHDO7Nx2hSVRDXgXQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic8SygGpzRrGLjoolxpV3ZXwIjCuYp7cTXnoibwUKjpz4Qas1zQiaa964w/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicPLSKY0FuwspwELuk37XjgC25xNjJiaiawElxFID70PMxRxpuBHQxLhOA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicHy4iaN2QicgAbTl2TwyVPwhFib4FQAITzVTZwDIB098jkLK0h5NWHzfgw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicP5O4nibonFr4fvIeP3U4JFicbDotwRDtS2W8lIdxwf1XE0vcZCWCU0FQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicAxV3gpiaD2rLeiaWK2AsQrdQmbgicvkCeSE0T8d5ziaMZ3YFBYLSG7C7Fw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicjP9SO1EQ58kscReDsibYk21Q815NU0HsfrmeB2K6pcp9TWqUC55PrSQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicvHabtauD53ibXNDl0BCJFavXGeiaCbt7GNFTHxzichJdZ27cVuL3fvWFQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicouaYYSYdCuxhx0MBwRbPaUACNuUsjr1CSmRdDPCz6t1bwW74Au6rbA/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicj3aHsiavglMmAiaqEZsl34XUiaIAF9LD26rVjjDzBUPbSC7Fw4OhdOLyw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeicb3ftn3YJbeamKuB7I467zsbmbuyyr3fClcia9XI3R1y9ht8AvibPfLLQ/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjX0NGSkxQzhJBFw3JrIuYeic60IAA1k1iblibAPNCKH9FUdJPhots1DuCO1oSnIGH21gTMJuWSOUUuibg/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXq2XJszY2EIeR5WWv5oJTIFjjeMCXLaLXyasGqNVOBYjoEPe3x9rm1QiamcmNcYFXrO2fIhsBbnFw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjXq2XJszY2EIeR5WWv5oJTIwJ5wKLrIcLhibrxp4KHs2JqPicWDS045ibX9CDbxaTljibVFzWic83BQNqw/640?wx_fmt=jpeg",
    "https://mmbiz.qpic.cn/mmbiz_jpg/X4KuerPfUjV61cib0CW17rG8O4kZ4XEibR3aVrLicyA6RHiaBjAWuibWv14OvBwCHoN65ibUwicrS2jscyB44ianMDYq9A/640?wx_fmt=jpeg",
  ],
};

function extFromUrl(url) {
  if (url.includes("wx_fmt=gif")) return "gif";
  if (url.includes("wx_fmt=png")) return "png";
  return "jpg";
}

async function download(slug, urls) {
  const outDir = path.join(root, "public/work/beer-matters/hk-travel", slug);
  fs.mkdirSync(outDir, { recursive: true });
  const images = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i].split("&tp=")[0].split("&from=")[0];
    const ext = extFromUrl(url);
    const name = `${String(i + 1).padStart(2, "0")}.${ext}`;
    const filePath = path.join(outDir, name);
    const res = await fetch(url, {
      headers: { Referer: "https://mp.weixin.qq.com/", "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) {
      console.warn(`skip ${slug}/${name}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buf);
    images.push(`/work/beer-matters/hk-travel/${slug}/${name}`);
    process.stdout.write(".");
  }
  console.log(`\n${slug}: ${images.length} images`);
  return images;
}

const manifest = {};
for (const [slug, urls] of Object.entries(ARTICLES)) {
  manifest[slug] = await download(slug, urls);
}

const manifestPath = path.join(root, "src/lib/demo/beer-hk-travel-images.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("wrote", manifestPath);
