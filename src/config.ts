import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://akrab.top/",
  author: "mithras",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Mithras",
  ogImage: "mithras-og.png",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-EN", "zh-CN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mithrasu",
    linkTitle: ``,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/Akrab898892",
    linkTitle: ``,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/mithrasu",
    linkTitle: ``,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@mithrasu",
    linkTitle: ``,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discord.gg/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:quaizast@gmail.com",
    linkTitle: ``,
    active: true,
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/Quaizast/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mithrasu/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://www.whatsapp.com/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    linkTitle: ``,
    active: false,
  },
];
