---
title: Configuration Guide
description: Complete guide to config.json settings
---

## File Location

**Important:** at `public/config.json` (not project root).

## Basic Structure

```json
{
  "siteName": "LazyDocs",
  "tagline": "Create beautiful documentation",
  "logo": {
    "light": "/assets/logo/logo.png",
    "dark": "/assets/logo/logo.png"
  },
  "title": {
    "light": "/assets/title/title-light.png",
    "dark": "/assets/title/title-dark.png"
  },
  "favicon": "/favicon.ico",
  "colorTheme": "brownie",
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs/getting-started/introduction" },
      { "label": "GitHub", "href": "https://github.com/yourrepo" }
    ]
  },
  "footer": {
    "copyright": "© 2025 LazyDocs",
    "links": [
      { "label": "GitHub", "href": "https://github.com/yourrepo" }
    ]
  },
  "docsPath": "docs"
}
```

## Site Metadata

### siteName (required)

```json
{
  "siteName": "My Documentation"
}
```

Appears in navbar, browser tab, SEO tags.

### tagline (optional)

```json
{
  "tagline": "Beautiful docs made easy"
}
```

Shows on homepage hero, used in SEO meta description.

### favicon (optional)

```json
{
  "favicon": "/favicon.ico"
}
```

Path to favicon file in `public/`.

## Logo & Title

### logo (optional)

**Type:** Object with `light` and `dark` properties

```json
{
  "logo": {
    "light": "/assets/logos/logo.png",
    "dark": "/assets/logos/logo-dark.png"
  }
}
```

Place images in `public/assets/logo/`.

### title (optional)

**Type:** Object with `light` and `dark` properties

```json
{
  "title": {
    "light": "/assets/titles/title-light.png",
    "dark": "/assets/titles/title-dark.png"
  }
}
```

Optional image to show instead of `siteName` text.

## Theme

### colorTheme (optional)

```json
{
  "colorTheme": "bluewave"
}
```

**Available themes:**
- `"brownie"` (default)
- `"greenleaf"`
- `"bluewave"`
- `"panda"`

See [Themes](/docs/customization/themes).

## Navigation

### navbar.links (optional)

```json
{
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs" },
      { "label": "GitHub", "href": "https://github.com/user/repo" }
    ]
  }
}
```

**Link types:**
- `to` - Internal (React Router, no reload)
- `href` - External (opens new tab)

### footer (optional)

```json
{
  "footer": {
    "copyright": "© 2025 Your Company",
    "links": [
      { "label": "Privacy", "to": "/docs/privacy" },
      { "label": "Contact", "href": "mailto:hello@example.com" }
    ]
  }
}
```

## Advanced

### docsPath (optional)

```json
{
  "docsPath": "docs"
}
```

Folder where markdown files are stored. Default: `"docs"`.

## Complete Example

```json
{
  "siteName": "Acme Documentation",
  "tagline": "Developer docs for Acme API",
  "logo": {
    "light": "/assets/logo/acme.svg",
    "dark": "/assets/logo/acme-white.svg"
  },
  "favicon": "/favicon.ico",
  "colorTheme": "bluewave",
  "navbar": {
    "links": [
      { "label": "Home", "to": "/" },
      { "label": "Docs", "to": "/docs" },
      { "label": "API", "to": "/docs/api" },
      { "label": "GitHub", "href": "https://github.com/acme" }
    ]
  },
  "footer": {
    "copyright": "© 2025 Acme Inc.",
    "links": [
      { "label": "Terms", "to": "/docs/terms" },
      { "label": "Privacy", "to": "/docs/privacy" },
      { "label": "Contact", "href": "mailto:support@acme.com" }
    ]
  }
}
```

## Sidebar Configuration

Sidebar is in `public/docs/sidebar.json` and is **auto-generated**.

**Don't edit manually!** Instead:
1. Organize files in `public/docs/`
2. Run `npm run generate-sidebar`

See [Auto Sidebar](/docs/customization/auto-sidebar).

## Environment Variables

Create `.env` for deployment:

```env
VITE_SITE_URL=https://docs.yoursite.com
```

Used for sitemap and SEO.

## Troubleshooting

**Changes not appearing?**
1. Validate JSON at [jsonlint.com](https://jsonlint.com)
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)

**Logo not showing?**
1. File exists in `public/assets/logo/`
2. Path starts with `/`
3. Filename matches exactly (case-sensitive)

## Next Steps

- [Themes](/docs/customization/themes) - Choose colors
- [Logo](/docs/customization/logo) - Add your logo
- [Auto Sidebar](/docs/customization/auto-sidebar) - Sidebar generation
