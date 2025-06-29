import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react' // Added from Erudite
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon' // Added from Erudite

import expressiveCode from 'astro-expressive-code' // Added from Erudite
import { rehypeHeadingIds } from '@astrojs/markdown-remark' // For Markdown
import rehypeExternalLinks from 'rehype-external-links' // Added from Erudite
import rehypeKatex from 'rehype-katex' // Added from Erudite
// rehype-pretty-code is also used by Erudite's markdown config, expressive-code might handle this.
// For now, let's stick to what Erudite explicitly imports for its markdown section.
import remarkEmoji from 'remark-emoji' // Added from Erudite
import remarkMath from 'remark-math' // Added from Erudite
import rehypeDocument from 'rehype-document' // Added from Erudite

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections' // Added for expressiveCode
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers' // Added for expressiveCode

import tailwindcss from '@tailwindcss/vite' // For Vite plugins
import { fileURLToPath, URL } from 'node:url'; // Added for path resolution

// https://astro.build/config
export default defineConfig({
  // Use CF_PAGES_URL for dynamic site URL in Cloudflare Pages previews,
  // otherwise fallback to a production URL or a sensible default.
  site: process.env.CF_PAGES_URL || 'https://sk-blog-jules.pages.dev/', // Fallback to the root pages.dev subdomain
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme="${theme.name.split('-')[1]}"]`,
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        overridesByLang: {
          'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
            {
              showLineNumbers: false,
            },
        },
      },
      styleOverrides: {
        codeFontSize: '0.75rem',
        borderColor: 'var(--border)',
        codeFontFamily: 'var(--font-mono)',
        codeBackground:
          'color-mix(in oklab, var(--secondary) 25%, transparent)',
        frames: {
          editorActiveTabForeground: 'var(--muted-foreground)',
          editorActiveTabBackground:
            'color-mix(in oklab, var(--secondary) 25%, transparent)',
          editorActiveTabIndicatorBottomColor: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorTabBorderRadius: '0',
          editorTabBarBackground: 'transparent',
          editorTabBarBorderBottomColor: 'transparent',
          frameBoxShadowCssValue: 'none',
          terminalBackground:
            'color-mix(in oklab, var(--secondary) 25%, transparent)',
          terminalTitlebarBackground: 'transparent',
          terminalTitlebarBorderBottomColor: 'transparent',
          terminalTitlebarForeground: 'var(--muted-foreground)',
        },
        lineNumbers: {
          foreground: 'var(--muted-foreground)',
        },
        uiFontFamily: 'var(--font-sans)',
      },
    }),
    mdx(),
    react(), // Added from Erudite
    sitemap(),
    icon(), // Added from Erudite
  ],
  vite: {
    plugins: [tailwindcss()], // Erudite's way of integrating Tailwind
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  server: { // Added from Erudite - for local dev consistency
    port: 1234,
    host: true,
  },
  devToolbar: { // Added from Erudite
    enabled: false,
  },
  markdown: { // Added from Erudite - crucial for styling
    syntaxHighlight: false, // Erudite uses expressiveCode or pretty-code
    rehypePlugins: [
      [
        rehypeDocument, // For KaTeX CSS
        {
          css: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
        },
      ],
      [
        rehypeExternalLinks, // Open external links in new tab
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds, // Add IDs to headings
      rehypeKatex, // Render math with KaTeX
      // rehypePrettyCode is not explicitly added here by Erudite,
      // relying on expressiveCode for code blocks.
      // If issues arise, this might need to be added.
    ],
    remarkPlugins: [remarkMath, remarkEmoji], // For math and emoji support
  },
});
