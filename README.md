# Git-Based Blogging Platform with Astro and Cloudflare Pages

This is a fast, static blogging application built with [Astro](https://astro.build/) and designed for easy content management via Git. It's themed with a customized version of the "Astro Erudite" theme and ready for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

## Core Features

- **Astro-Powered**: Leverages Astro for optimal performance and a great developer experience.
- **Erudite Theme**: Clean, readable, and academic-inspired design.
- **Git-Based Content**: Create new blog posts simply by adding Markdown files to the `src/content/posts/` directory.
- **Tailwind CSS**: For utility-first styling.
- **Shadcn/ui Components**: Base UI elements are integrated via the Erudite theme.
- **Content Collections**: Astro's Content Collections manage blog posts, authors, and projects.
- **Dark Mode**: Supported.
- **RSS Feed**: Automatically generated at `/rss.xml`.
- **Subscribe Pop-up**: A simple pop-up to collect email addresses, saving them to `subscribers.json` via an API route.
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
    The Erudite theme uses specific fonts and image assets that could not be included directly via the automated setup due to tool limitations. Please download them from the original theme repository and place them into your project:

    *   **Fonts (`GeistVF.woff2`, `GeistMonoVF.woff2`):**
        *   Source: [https://github.com/jktrn/astro-erudite/tree/main/public/fonts](https://github.com/jktrn/astro-erudite/tree/main/public/fonts)
        *   Destination: `public/fonts/` (overwrite the placeholder files).

    *   **Root Public Images (favicons, etc.):**
        *   Source Directory: [https://github.com/jktrn/astro-erudite/tree/main/public/](https://github.com/jktrn/astro-erudite/tree/main/public/)
        *   Files to download: `apple-touch-icon.png`, `favicon-96x96.png`, `favicon.ico`.
        *   (Note: `favicon.svg` and `site.webmanifest` were created with content).
        *   Destination: `public/` (overwrite placeholders).

    *   **Static Images (logos, social cards):**
        *   Source Directory: [https://github.com/jktrn/astro-erudite/tree/main/public/static/](https://github.com/jktrn/astro-erudite/tree/main/public/static/)
        *   Files to download: `1200x630.png`, `logo.png`, `twitter-card.png`.
        *   (Note: `logo.svg` was created with content).
        *   Destination: `public/static/` (overwrite placeholders).
        *   Also download `web-app-manifest-192x192.png` and `web-app-manifest-512x512.png` from the root of Erudite's `public` and place them in your `public` directory.


4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a local development server, typically at `http://localhost:4321` (Astro's default) or `http://localhost:1234` (as configured in `astro.config.ts` from the Erudite theme).

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

### API Route for Subscriptions

The subscribe pop-up uses an API route (`/api/subscribe`) that saves emails to `subscribers.json` in the project root.
- **Local Development**: This works by writing to the local file system.
- **Cloudflare Pages**: Astro's API routes are typically converted to Cloudflare Functions during the build process.
    - Writing to a JSON file within the deployed function's file system is generally **not recommended for persistent storage** on Cloudflare Pages/Functions, as the file system can be ephemeral or read-only after deployment.
    - **For robust email collection on Cloudflare Pages**, you would typically integrate with:
        - **Cloudflare KV Store**: Store emails in a KV namespace. Requires setting up a KV namespace and binding it to your Pages Function.
        - **Cloudflare D1**: A SQLite database.
        - **Third-party email service API**: Send emails directly to a service like Mailchimp, ConvertKit, etc.
    - The current `subscribers.json` approach will likely result in data loss or write errors in a deployed Cloudflare environment. It's included as a basic mechanism as per the request, with the understanding that the "automated emails later" step would involve replacing this with a proper backend or service.

## Customization

- **Site Configuration**: Modify `src/consts.ts` (for site title, description, social links, etc.) and `astro.config.ts` (for site URL, integrations).
- **Styling**: Adjust Tailwind classes in components and pages. Global styles are in `src/styles/global.css` and `src/styles/typography.css`.
- **Components**: Modify or add new components in `src/components/`.
- **Layout**: The main site structure is in `src/layouts/Layout.astro`.
