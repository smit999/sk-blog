import { defineCollection, z } from 'astro:content';

// Blog collection schema - Name changed to 'posts' to match desired directory
const posts = defineCollection({ // Renamed from 'blog' to 'posts'
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      order: z.number().optional(),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
});

// Authors collection schema (from Erudite theme)
const authors = defineCollection({
  type: 'data', // Erudite's original used glob implying 'content'. This might need adjustment.
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url().or(z.string().startsWith('/')),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
});

// Projects collection schema (from Erudite theme)
const projects = defineCollection({
  type: 'data', // Erudite's original used glob implying 'content'. This might need adjustment.
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
});

export const collections = {
  posts, // Collection key is now 'posts'
  authors,
  projects,
};
