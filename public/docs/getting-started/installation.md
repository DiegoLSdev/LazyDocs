---
title: Installation
description: Set up LazyDocs in 3 easy steps
---

## Prerequisites

- **Node.js** 16+ ([download](https://nodejs.org))
- **npm** or **yarn**

Check your version:
```bash
node --version  # Should be v16 or higher
npm --version
```

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/DiegoLSdev/LazyDocs.git
cd lazydocs
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### 3. Start Dev Server

```bash
npm run dev
```

Your site opens at `http://localhost:5173` (Vite default port).

## Project Structure

```
lazydocs/
├── public/
│   ├── config.json              # Main config (site name, logo, navbar)
│   ├── docs/                    # Your markdown files
│   │   ├── getting-started/
│   │   ├── customization/
│   │   ├── writing/
│   │   ├── advanced/
│   │   ├── sidebar.json         # Generated automatically
│   │   └── _sidebar-order.json  # Control folder order
│   └── assets/
│       └── logo/                # Put your logo here
├── src/
│   ├── components/              # React components
│   ├── themes/                  # Theme CSS files
│   ├── locales/                 # i18n translations
│   └── utils/                   # Helper functions
├── scripts/
│   ├── generate-sidebar.js      # Auto-generates sidebar
│   └── generate-sitemap.js      # Generates sitemap.xml
└── package.json
```

## Key Files

| File | Purpose |
|------|---------|
| `public/config.json` | Site settings (name, logo, navbar, footer, theme) |
| `public/docs/` | Your markdown documentation files |
| `public/docs/sidebar.json` | Auto-generated navigation (don't edit manually) |
| `public/docs/_sidebar-order.json` | Control order of folders in sidebar |

## Build for Production

```bash
npm run build
```

This command:
1. Runs `generate-sidebar` - Creates sidebar.json from folder structure
2. Runs `generate-sitemap` - Creates sitemap.xml for SEO
3. Runs `vite build` - Builds optimized static site

Output goes to `dist/` folder.

## Deploy

LazyDocs builds to static files. Deploy to:

**Vercel** (recommended)
```bash
vercel --prod
```

**Netlify**
1. Connect Git repo
2. Build command: `npm run build`
3. Publish directory: `dist`

**GitHub Pages**
```bash
npm run build
# Deploy dist/ folder
```

Any static host works (AWS S3, Cloudflare Pages, etc.)

## Troubleshooting

**Port 5173 already in use?**
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

**Build fails?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Sidebar not updating?**
```bash
# Manually regenerate
npm run generate-sidebar
```

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) - Create your first page
- [Configuration](/docs/customization/configuration) - Customize settings
- [Auto Sidebar](/docs/customization/auto-sidebar) - How sidebar generation works
