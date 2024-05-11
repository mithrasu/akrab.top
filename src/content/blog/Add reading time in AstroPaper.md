---
author: Mithras
pubDatetime: 2024-04-28T12:18:36.000+08:00
modDatetime: 2024-04-28T12:45:13.000+08:00
title: 在 AstroPaper 中添加阅读时间
slug: add-reading-time
featured: false
draft: false
tags:
  - Blog
  - AstroPaper
description: 为 AstroPaper 博客添加并展示预估的阅读时间
---


根据 [Astro Docs](https://docs.astro.build/en/recipes/reading-time/) 所讲，可以使用 [remark 插件](https://github.com/remarkjs/remark) 为页面添加预估的阅读时间。而在 [AstroPaper](https://github.com/satnaing/astro-paper) 中，进行了一些调整。

## 安装所需依赖

```shell
npm install reading-time mdast-util-to-string
```

`reading-time`：计算阅读分钟数

`mdast-util-to-string`：用于从 markdown 文件中提取所有文本

## 创建 remark 插件

在`utils`目录下创建`remark-reading-time.mjs`文件：

```js
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
```

## 文章详情页添加阅读时间

将该插件添加到 `astro.config.ts` 文件中：

```ts
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkReadingTime, // 👈🏻 readingTime plugin
    ],
});
```

将 `readingTime` 添加到 `src/content/config.ts` 中：

```ts
import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // others...
      readingTime: z.string().optional(), // 👈🏻 readingTime frontmatter
    }),
});

export const collections = { blog };
```

然后，在  `src/utils`  目录下创建一个名为  `getPostsWithRT.ts`  的文件：

```ts
import type { MarkdownInstance } from "astro";
import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export const getReadingTime = async () => {
  // Get all posts using glob. This is to get the updated frontmatter
  const globPosts = import.meta.glob("../content/blog/*.md") as Promise<
    CollectionEntry<"blog">["data"][]
  >;

  // Then, set those frontmatter value in a JS Map with key value pair
  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async globPost => {
      const { frontmatter } = await globPost();
      mapFrontmatter.set(
        slugifyStr(frontmatter.title),
        frontmatter.readingTime
      );
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugifyStr(post.data.title));
    return post;
  });
};

export default getPostsWithRT;
```

重构  `/src/pages/posts/[slug]/index.astro`  的  `getStaticPaths` 方法：

```js
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  // replace reading time logic with this func
  const postsWithRT = await getPostsWithRT(posts);

  // replace posts with postsWithRT
  const postResult = postsWithRT.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));

  const pagePaths = getPageNumbers(posts.length).map(pageNum => ({
    params: { slug: String(pageNum) },
  }));

  return [...postResult, ...pagePaths];
}
```

最后，在 `src/layouts/PostDetails.astro` 中添加 `readingTime`：

```js
const {
  title,
  author,
  description,
  ogImage,
  readingTime,  // add prop
  canonicalURL,
  pubDatetime,
  modDatetime,
  tags,
} = post.data;
```

## 显示阅读时间

更新 `src/components/Datetime.tsx` 组件：

```tsx
import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
  readingTime?: string; // define type
}

export default function Datetime({
  datetime,
  size = "sm",
  className,
  readingTime,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
        <span> ({readingTime})</span>
      </span>
    </div>
  );
}
```

从父组件传递 `readingTime` 属性。

`src/components/Card.tsx`：

```tsx
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime description, readingTime } = frontmatter;
  return (
    ...
    <Datetime
      pubDatetime={pubDatetime}
      modDatetime={modDatetime}
      readingTime={readingTime}
    />
    ...
  );
}
```
