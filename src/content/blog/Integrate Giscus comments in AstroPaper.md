---
author: Mithras
pubDatetime: 2024-04-28T13:11:02Z
modDatetime: 
title: AstroPaper 集成 giscus 评论系统
slug: Integrate-giscus-comments
featured: false
draft: false
tags:
  - Blog
  - AstroPaper
  - Giscus
description: 为 Astro（AstroPaper） 博客网站集成由 Github Discussion 支持的 giscus 评论系统
---

## giscus

[giscus](https://giscus.app/) 是一款由 Github Discussion 支持的免费开源的评论系统，可以非常方便地集成到静态网站中。

- 不需要数据库，所有数据存储在 Github Discussion 中；
- 支持自定义主题；
- 支持多种语言；
- 支持自托管。

仓库地址：[https://github.com/giscus/giscus](https://github.com/giscus/giscus)

### 运行机制

当 giscus 加载时，将使用 [GitHub Discussion search API](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search) 根据选定的映射（`URL`、`pathname`、`<title>` 等）查找与页面关联的讨论。

网站的访问者必须授权 [giscus app](https://github.com/apps/giscus) 使用 GitHub OAuth 登录才可以发表评论，或者，也可以直接在 Github Discussion 上发表评论。

## 前提条件

1. 集成 giscus 的仓库必须是 public 的；
2. 仓库已启用 Github Discussion；
3. 安装了 **[giscus](https://github.com/apps/giscus)** 应用。

## 配置

1. 选择显示的语言；
2. 配置 Github 仓库；
3. 选择页面和 Discussion 的映射；
4. 选择 Discussion Category；
5. 选择主题配色；

填写完上述配置后，giscus 会生成以下内容：

```js
<script src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="title"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async>
</script>
```

然后，在 `src/layouts/PostDetails.astro` 文件中，将这段代码添加到文章中评论的所在位置。

OK，你的博客已集成了 giscus 评论。

## 动态切换主题

上面嵌入的脚本是静态的，AstroPaper 具有主题切换功能，如果我们想让评论与网站的其他部分一样无缝切换主题，需要使用 [giscus compontent](https://github.com/giscus/giscus-component) 来实现。

首先，为 giscus 安装 [React 组件](https://www.npmjs.com/package/@giscus/react)。

```shell
npm i @giscus/react
```

然后，在 `src/components` 下创建一个新的 React 组件 `Comments.tsx`：

```tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@config";
import { useEffect, useState } from "react";

interface Props {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: Props) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

再将 giscus 配置添加到网站配置文件 `src/config.ts`：

```ts
import type { GiscusProps } from "@giscus/react";

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "title",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "en",
  loading: "lazy",
};
```

最后，将新的评论组件添加到 `src/layouts/PostDetails.astro`：

```js
import Comments from "@components/Comments";

<Layout {...layoutProps}>
  <Header />
  ...
  <main id="main-content">
    ...
    <Comments client:only />
  </main>
  <Footer />
</Layout>
```
