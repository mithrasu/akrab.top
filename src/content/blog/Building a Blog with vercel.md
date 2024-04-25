---
author: Mithras
pubDatetime: 2024-04-25T20:59:01Z
modDatetime: 2024-04-26T00:02:14Z
title: 使用 Vercel 搭建博客
slug: building-a-blog-with-vercel
featured: false
draft: false
tags:
  - Blog
description: 使用 Vercel 搭建一个博客网站，并绑定自定义域名
---

[Vercel](https://vercel.com/)是一个构建和部署应用程序的平台，快速构建、自动部署前端静态网站，且平台本身提供 CDN 加速，访问速度比较快。并且支持 35+ 框架，提供了大量的模版。

> **Vercel is the Frontend Cloud.** Build, scale, and secure a faster, personalized web.

个人用户使用 Hobby（免费计划） 足够了。

## 创建 Vercel 项目

注册 Vercel，推荐使用 [Github](https://github.com/) 账号。

新建一个项目，可以选择导入 Github 仓库，我这里选择使用 [AstroPaper](https://github.com/satnaing/astro-paper) 主题部署。

![Vercel Project](https://image.akrab.top/blog-picture/2024/04/138fb1def37edb51b37c7a537cfa4eb8.png)

你也可以在这里选择其他的模版：[https://vercel.com/templates](https://vercel.com/templates)

![Vercel Templates](https://image.akrab.top/blog-picture/2024/04/f8e05c4244336410d56ac41dc9e3e907.png)

填写仓库名称之后创建仓库，然后点击部署。

> 如果后续需要使用 [Giscus](https://giscus.app/) 搭建评论系统，则创建公开仓库。

![Git Repository](https://image.akrab.top/blog-picture/2024/04/ca021e599a360b97885d06d3e38f86cc.png)

部署成功后，可在仪表板和 GitHub 仓库查看。

## 绑定自定义域名（可选）

由于 `vercel.app` 域名已经被 DNS 污染，国内网络访问比较慢

### 准备域名

首推在 [Namesilo](http://www.namesilo.com/) 购买域名，有以下优点：

- 价格便宜，[Domain Prices](https://www.namesilo.com/pricing.php)
- 永久免费的隐私保护
- 安全性高，支持账户登陆二次验证和 Domain Defender
- 支持支付宝、信用卡、PayPal 等多种支付方式

### 绑定域名

在 Project Settings ——> Domains 中添加域名。

![Vercel Domains](https://image.akrab.top/blog-picture/2024/04/9087b6bfc04f1c30bfeac93406ea5fea.png)

如果看到 `Invalid Configuration` 提示，说明域名已经添加，但是需要添加 CNAME 或 Nameserver 激活。

### 配置 CNAME 解析

我这里使用了 [Cloudflare](https://cloudflare.com/) 进行解析。

- 添加一条域名 A 记录指向 Vercel 服务器地址 `76.76.21.21`；
- 按 Vercel 提示，添加一条 CNAME 记录值为 Vercel 的 CNAME 服务器：`cname.vercel-dns.com` ;

![CloudFlare DNS](https://image.akrab.top/blog-picture/2024/04/81882b8514e4583538638c8f369e0bc7.png)

- 添加成功后，还需要在 ssl/tls 配配置开启 https 完全加密 ， 否则会因为证书不匹配导致反复重定向而打不开网页。

![Cloudflare SSL/TLS](https://image.akrab.top/blog-picture/2024/04/0fd660ea538a63cea0e8fcd4fb84d23f.png)
