import { defineCollection, z } from 'astro:content';

// Posts collection (formerly blog)
const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().optional(), // Default to "Admin" will be handled in component/page
      tags: z.array(z.string()).optional(),
      order: z.number().optional(), // from Erudite
      image: image().optional(), // from Erudite
      draft: z.boolean().optional(), // from Erudite
    }),
});

// Authors collection - simplified to 'data' as primary focus is blog posts
// Erudite theme might have author pages that expect these to be 'content' type.
// This can be adjusted later if full author pages from Erudite are needed.
const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url().or(z.string().startsWith('/')), // Path to avatar image
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
});

// Projects collection - simplified to 'data'
// Erudite theme might have project pages expecting 'content' type.
const projects = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(), // Project cover image
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
});

export const collections = {
  posts,
  authors,
  projects,
};
