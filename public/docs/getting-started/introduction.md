---
title: Welcome to LazyDocs
description: Simple and customizable documentation platform - Clone, customize, and deploy
---

LazyDocs is a lightweight documentation platform built with React and Vite. Write your docs in Markdown, customize the theme, and deploy anywhere.

## Why LazyDocs?

- **Markdown-Based** - Write docs in simple Markdown
- **Auto Sidebar** - Sidebar generated from folder structure
- **4 Beautiful Themes** - Brownie, Greenleaf, Bluewave, Panda
- **Dark Mode** - Built-in dark/light theme toggle
- **Full-Text Search** - Fast fuzzy search with Fuse.js
- **i18n Ready** - 5 languages included (EN, ES, FR, DE, PT)
- **MDX Components** - Interactive elements like Callouts, Tabs, Cards
- **SEO Optimized** - Automatic meta tags, sitemap, structured data
- **No Backend** - Pure static site, deploy to Vercel/Netlify/GitHub Pages

## Quick Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/DiegoLSdev/LazyDocs
   cd lazydocs
   npm install
   npm run dev
   ```

2. **Customize**
   - Edit `public/config.json` - Site name, logo, navbar
   - Choose theme in `config.json` - `colorTheme: "bluewave"`
   - Add logo: `public/assets/logo/logo.png`

3. **Write Docs**
   - Create `.md` files in `public/docs/`
   - Sidebar auto-generates from folder structure
   - Run `npm run generate-sidebar` to rebuild

## What You Get

**Navigation**
- Auto-generated sidebar from folders
- Breadcrumbs
- Previous/Next page links
- Reading progress bar
- Table of Contents

**Search**
- Full-text fuzzy search (Cmd/Ctrl+K)
- Weighted results (title > description > content)
- Cached index for speed

**Components**
- Syntax-highlighted code blocks with copy button
- Callouts (info, warning, error, success, tip)
- Tabs for alternatives (npm/yarn/pnpm)
- Cards for features
- Steps for tutorials
- Accordions for FAQs

**SEO**
- Automatic sitemap generation
- Meta tags from frontmatter
- Open Graph for social sharing
- JSON-LD structured data

## Next Steps

**New User?**
1. [Installation](/docs/getting-started/installation) - Set up LazyDocs
2. [Quick Start](/docs/getting-started/quick-start) - Your first doc page

**Want to Customize?**
- [Themes](/docs/customization/themes) - Switch color themes
- [Logo & Branding](/docs/customization/branding) - Add your logo
- [Configuration](/docs/customization/configuration) - Complete config guide

**Advanced Features:**
- [MDX Components](/docs/advanced/mdx-components) - Interactive elements
- [Search System](/docs/advanced/search) - How search works
- [SEO](/docs/advanced/seo) - Optimize for Google
