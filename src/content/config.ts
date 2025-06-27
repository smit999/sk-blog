import { defineCollection, z } from 'astro:content';

// Posts collection
const posts = defineCollection({
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

// Authors collection - defined as data, no loader needed.
const authors = defineCollection({
  type: 'data',
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

// Projects collection - defined as data, no loader needed.
const projects = defineCollection({
  type: 'data',
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
  posts,
  authors,
  projects,
};
