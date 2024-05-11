---
author: Mithras
pubDatetime: 2024-05-11T10:34:16.000+08:00
modDatetime: 
title: AstroPaper 增加 RSS 全文输出
featured: false
draft: false
tags:
  - Blog
  - AstroPaper
description: 为 AstroPaper 博客增加 RSS 全文输出
---


昨天使用 [NetNewsWire](https://netnewswire.com/) 订阅了自己博客的 RSS，才发现订阅后的文章没有展示全文，因此需要稍作调整。

在修改之前，需要引入一个新的依赖 `marked`，在项目文件中可以通过 `npm install marked` 安装这个库。

然后修改 `src/pages/rss.xml.ts` 文件：

```ts
...
import { marked } from "marked";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    ...
    items: sortedPosts.map(({ data, slug, body }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.description,
      tags: data.tags,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      content: marked(body),
    })),
  });
}
```

从 `astro:content` 获取了 `body` 属性，即文章的 Markdown 内容。我们使用 `marked` 库将 Markdown 渲染为 HTML，并设置为 `content` 属性的值，方便读者阅读。

![Full-text Rss](https://image.akrab.top/blog-picture/2024/05/f83a918a03d1a506fd40ee3f0b267e59.png)
