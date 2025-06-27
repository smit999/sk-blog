import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'SK BLOG',
  description:
    'Welcome to SK BLOG! A personal blog exploring various topics.', // Generic description
  href: 'https://sk-blog.pages.dev', // Placeholder, user should update
  author: 'SK', // Updated author
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/posts',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'mailto:smit@hasksoftwares.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
