# SK BLOG: A Git-Based Blogging Platform with Astro

This is a fast, static blogging application built with [Astro](https://astro.build/) and designed for easy content management via Git. It's styled with a clean, readable design inspired by academic aesthetics (derived from the Erudite theme) and ready for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

## Core Features

- **Astro-Powered**: Leverages Astro for optimal performance and a great developer experience.
- **Clean Design**: Readable and focused design, adapted from theme sources.
- **Git-Based Content**: Create new blog posts simply by adding Markdown files to the `src/content/posts/` directory.
- **Tailwind CSS**: For utility-first styling.
- **Shadcn/ui Components**: Base UI elements are integrated.
- **Content Collections**: Astro's Content Collections manage blog posts, authors, and projects.
- **Dark Mode**: Supported.
- **RSS Feed**: Automatically generated at `/rss.xml`.
- **Cloudflare Pages Ready**: Optimized for seamless deployment on Cloudflare's global network.

## Project Structure

- **`src/content/posts/`**: Your blog posts live here as Markdown (`.md` or `.mdx`) files.
- **`src/content/config.ts`**: Defines the schemas for content collections (posts, authors, projects).
- **`src/layouts/Layout.astro`**: The main site layout.
- **`src/components/`**: Contains Astro and UI components (including those from Erudite theme and shadcn/ui).
- **`src/pages/`**: Astro pages, including the home page, blog index, tag pages, and API routes.
- **`public/`**: Static assets. **Note: Some theme assets (fonts, specific images) need to be manually placed here.**
- **`astro.config.ts`**: Astro project configuration.
- **`tailwind.config.mjs`**: Tailwind CSS configuration.
- **`subscribers.json`**: Stores email addresses collected from the subscribe pop-up (in a production scenario, consider a more robust storage solution).

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies:**
    Make sure you have Node.js (v18 or higher recommended) and npm installed.
    ```bash
    npm install
    ```

3.  **Manually Download Required Assets:**
    The theme uses specific fonts and image assets that could not be included directly via the automated setup due to tool limitations. Please download them from the original Erudite theme repository ([https://github.com/jktrn/astro-erudite](https://github.com/jktrn/astro-erudite)) and place them into your project:

    *   **Fonts (`GeistVF.woff2`, `GeistMonoVF.woff2`):**
        *   Source: `public/fonts/` directory in the Erudite theme repo.
        *   Destination: `public/fonts/` in your project (overwrite the placeholder files).

    *   **Root Public Images (favicons, etc.):**
        *   Source Directory: `public/` directory in the Erudite theme repo.
        *   Files to download: `apple-touch-icon.png`, `favicon-96x96.png`, `favicon.ico`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`.
        *   (Note: `favicon.svg` and `site.webmanifest` were created with SK BLOG specific content or Erudite's SVG content).
        *   Destination: `public/` in your project (overwrite placeholders).

    *   **Static Images (logos, social cards):**
        *   Source Directory: `public/static/` directory in the Erudite theme repo.
        *   Files to download: `1200x630.png`, `logo.png`, `twitter-card.png`.
        *   (Note: `logo.svg` was created with Erudite's SVG content).
        *   Destination: `public/static/` in your project (overwrite placeholders).


4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a local development server, typically at `http://localhost:1234` (as configured in `astro.config.ts`).

## Creating a New Blog Post

1.  **Create a new Markdown file** (e.g., `my-new-post.md`) inside the `src/content/posts/` directory.
2.  **Add frontmatter** to the top of the file. The required and optional fields are defined in `src/content/config.ts` for the `posts` collection. Example:

    ```yaml
    ---
    title: "My Awesome New Post"
    description: "A short summary of what this post is about."
    pubDate: YYYY-MM-DD # e.g., 2024-07-15
    author: "Your Name" # Optional, defaults to "Admin" if not provided in display logic
    tags: ["Tech", "Astro", "Blogging"] # Optional
    image: "/path/to/your/post-image.jpg" # Optional, relative to public/
    draft: false # Optional, set to true to hide from production builds
    ---

    Your blog post content in Markdown starts here...
    ```

3.  **Write your content** using Markdown. You can also use MDX if you need to import components.
4.  Commit and push your changes to your Git repository. If deployed, Cloudflare Pages will automatically rebuild and deploy your site.

## Deployment to Cloudflare Pages

1.  **Push your Astro project to a GitHub (or GitLab/Bitbucket) repository.**
2.  **Log in to your Cloudflare dashboard.**
3.  Go to **Workers & Pages** and select **Create application** > **Pages** > **Connect to Git**.
4.  **Select your repository** and begin setup.
5.  **Build settings:**
    *   **Framework preset**: Select **Astro**.
    *   **Build command**: `npm run build` (or `astro build`)
    *   **Build output directory**: `dist`
    *   **Environment variables (optional but recommended for some features):**
        *   You might need to set `NODE_VERSION` if your local Node.js version is very specific, though Cloudflare usually handles Astro well.
6.  **Deploy your site.** Cloudflare Pages will automatically build and deploy your site. Future pushes to your connected branch (e.g., `main`) will trigger new deployments.

*(Note: The subscribe pop-up functionality was removed to resolve UI issues. If you wish to re-implement it, ensure proper handling of email storage for serverless environments, e.g., using Cloudflare KV or a third-party service, as direct file writes to `subscribers.json` are not reliable in such environments.)*

## Customization

- **Site Configuration**: Modify `src/consts.ts` (for site title, description, social links, etc.) and `astro.config.ts` (for site URL, integrations). Remember to update `SITE.href` in `src/consts.ts` to your actual production URL.
- **Styling**: Adjust Tailwind classes in components and pages. Global styles are in `src/styles/global.css` and `src/styles/typography.css`.
- **Components**: Modify or add new components in `src/components/`.
- **Layout**: The main site structure is in `src/layouts/Layout.astro`.
