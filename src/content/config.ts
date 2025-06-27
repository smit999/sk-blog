import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().or(z.date()),
    author: z.string().default('Admin').optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts,
}; 