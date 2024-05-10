import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import { marked } from "marked";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
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
