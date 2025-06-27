import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts'; // Updated import path and object name
import sanitizeHtml from 'sanitize-html'; // For safety, if descriptions contain HTML
import MarkdownIt from 'markdown-it'; // To render markdown descriptions to plain text for RSS
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('posts', ({data}) => !data.draft); // Changed to 'posts' and filter drafts
  return rss({
    title: SITE.title, // Updated to use SITE object
    description: SITE.description, // Updated to use SITE object
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: sanitizeHtml(parser.render(post.data.description)), // Render markdown & sanitize
      link: `/posts/${post.slug}/`, // Changed link structure
      // Potentially add author if needed:
      // customData: `<author>${post.data.author || 'Admin'}</author>`
    })),
    // (Optional) Settings for XML stylesheet, if you want to style the RSS feed itself:
    // stylesheet: '/rss/styles.xsl',
    // (Optional) Custom data for the channel:
    // customData: `<language>${SITE.locale || 'en-us'}</language>`,
  });
}
