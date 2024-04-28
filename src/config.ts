import type { Site, SocialObjects } from "./types";
import type { GiscusProps } from "@giscus/react";

// Set basic site info
export const SITE: Site = {
  website: "https://akrab.top/",
  author: "mithras",
  desc: "Mithras Blog — Insights into coding, the art of living. On this crossroad of the digital and the real, I aim to explore the infinite possibilities of the tech world and capture the enchanting moments of everyday life. Engage, learn, laugh, and leave a lasting impression with us.",
  title: "Mithras",
  ogImage: "mithras-og.png",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 8 * 60 * 60 * 1000, // 8 hours
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-EN", "zh-CN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 96,
  height: 96,
};

export const GISCUS: GiscusProps = {
  repo: "mithrasu/akrab.top",
  repoId: "R_kgDOLoqvoQ",
  category: "General",
  categoryId: "DIC_kwDOLoqvoc4Ce3jg",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mithrasu",
    linkTitle: ``,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mithrasu/",
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
    href: "mailto:mithrasuy@gmail.com",
    linkTitle: ``,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    linkTitle: ``,
    active: false,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    linkTitle: ``,
    active: true,
  }
];
