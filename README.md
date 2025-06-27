# My Astro Blog

A fast, modern, and free-to-host blog built with [Astro](https://astro.build/) and Markdown, inspired by the Erudite theme but uniquely styled. Features server-side API endpoints for email subscriptions. Content is managed by simply adding Markdown files to your Git repository. Deploys automatically to Cloudflare Pages with Cloudflare Workers.

---

## 🚀 Features

- **Server-side API:** Email subscription system with Cloudflare Workers
- **No backend required:** All content is Markdown in your repo
- **Astro Content Collections:** Type-safe, easy content management
- **Modern, clean UI:** Inspired by Erudite, but uniquely styled
- **Tags & Categories:** Browse posts by tag
- **Email subscriptions:** Collect emails with a bottom overlay modal
- **Instant deploys:** Push to Git, Cloudflare Pages builds and deploys

---

## 🛠️ Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **View your site:**
   Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## ✍️ Creating a New Blog Post

1. **Add a Markdown file** to `src/content/posts/` (e.g., `my-new-post.md`).
2. **Use this frontmatter schema:**
   ```yaml
   ---
   title: "Your Post Title"           # (string, required)
   description: "Short summary"      # (string, required)
   pubDate: 2024-01-01                # (date, required)
   author: "Your Name"               # (string, optional, defaults to 'Admin')
   tags: ["tag1", "tag2"]            # (array of strings, optional)
   ---
   ```
3. **Write your content** in Markdown below the frontmatter.
4. **Commit and push** your changes to your Git repository.

---

## ☁️ Deploying to Cloudflare Pages

### Prerequisites
- A Cloudflare account
- Your code pushed to GitHub, GitLab, or Bitbucket

### Step 1: Install Cloudflare Adapter

This project uses server-side rendering for API endpoints. Install the Cloudflare adapter:

```bash
npm install @astrojs/cloudflare
```

### Step 2: Update Astro Configuration

Update your `astro.config.mjs` to include the Cloudflare adapter:

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [],
  output: 'server',
  adapter: cloudflare(),
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Step 3: Deploy to Cloudflare Pages

1. **Go to [Cloudflare Pages](https://pages.cloudflare.com/)** and create a new project from your repo.

2. **Set the build settings:**
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Root directory:** `/` (leave empty if your Astro project is in the root)

3. **Environment Variables (Optional):**
   - If you want to store subscriber emails in Cloudflare KV instead of files, add:
     - `CLOUDFLARE_KV_NAMESPACE_ID`: Your KV namespace ID
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

4. **Deploy!**
   - Every push to your repo will trigger a new build and deploy.

### Step 4: Configure Custom Domain (Optional)

1. In your Cloudflare Pages project settings, go to "Custom domains"
2. Add your domain and follow the DNS configuration instructions
3. Enable HTTPS (automatic with Cloudflare)

---

## 🔧 API Endpoints

### Email Subscription API

- **Endpoint:** `/api/subscribe`
- **Method:** POST
- **Body:** `{ "email": "user@example.com" }`
- **Response:** `{ "success": true }` or `{ "error": "message" }`

The subscription system currently saves emails to a local JSON file. For production, consider:
- Using Cloudflare KV for persistent storage
- Integrating with email services like Mailchimp or ConvertKit
- Adding email validation and rate limiting

---

## 📁 Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── posts/          # Your Markdown blog posts
│   │   └── config.ts       # Content collection schema
│   ├── pages/
│   │   ├── api/
│   │   │   └── subscribe.ts # Email subscription API
│   │   ├── posts/
│   │   │   └── [slug].astro # Individual post pages
│   │   ├── tags/
│   │   │   └── [tag].astro  # Tag pages
│   │   └── index.astro      # Home page
│   ├── components/
│   │   └── SubscribeModal.astro # Email subscription modal
│   └── styles/
│       └── global.css      # Global styles
├── public/                 # Static assets
├── data/                   # Subscriber data (gitignored)
└── dist/                   # Build output
```

---

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

---

## 🔒 Security & Privacy

- Email addresses are stored locally in JSON files
- No third-party tracking or analytics included
- HTTPS enforced on Cloudflare Pages
- Consider adding rate limiting for the subscription API

---

## 📝 License

MIT

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
