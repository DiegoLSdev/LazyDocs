---
title: Complete Branding Guide
description: Logo, favicon, colors, and visual identity
---

Make LazyDocs match your brand with custom logo, colors, and favicon.

## Quick Setup

**3 steps to brand your docs:**

1. **Logo** - Add to `public/assets/logo/`
2. **Config** - Edit `public/config.json`
3. **Theme** - Choose color theme

## Logo Setup

### 1. Prepare Logo

Create two versions:
- **Light mode** - Dark logo for light backgrounds
- **Dark mode** - Light logo for dark backgrounds

**Format:** SVG or PNG with transparent background  
**Size:** 32-48px height

### 2. Add to Project

```
public/
└── assets/
    └── logo/
        ├── logo.png          # For light mode
        └── logo-dark.png     # For dark mode
```

### 3. Configure

Edit `public/config.json`:

```json
{
  "siteName": "Acme Docs",
  "logo": {
    "light": "/assets/logo/logo.png",
    "dark": "/assets/logo/logo-dark.png"
  },
  "favicon": "/favicon.ico"
}
```

## Favicon

Add a favicon (browser tab icon):

1. **Generate:** Use [favicon.io](https://favicon.io)
2. **Place:** Save as `public/favicon.ico`
3. **Configure:**
   ```json
   {
     "favicon": "/favicon.ico"
   }
   ```

## Brand Colors

Choose a theme that matches your brand:

```json
{
  "colorTheme": "bluewave"
}
```

**Available themes:**
- `brownie` - Warm brown/tan
- `greenleaf` - Fresh green
- `bluewave` - Professional blue
- `panda` - Minimalist B&W

See [Themes](/docs/customization/themes) for details.

## Site Metadata

```json
{
  "siteName": "Acme Documentation",
  "tagline": "Developer docs for Acme API"
}
```

- `siteName` - Appears in navbar and browser tab
- `tagline` - Shows on homepage hero

## Complete Example

```json
{
  "siteName": "Acme Documentation",
  "tagline": "Build amazing apps with Acme",
  "logo": {
    "light": "/assets/logo/acme.svg",
    "dark": "/assets/logo/acme-white.svg"
  },
  "favicon": "/favicon.ico",
  "colorTheme": "bluewave",
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs" },
      { "label": "API", "to": "/docs/api" },
      { "label": "GitHub", "href": "https://github.com/acme" }
    ]
  }
}
```

## Asset Optimization

**Optimize your assets:**
- SVG: [SVGOMG](https://jakearchibald.github.io/svgomg/)
- PNG: [TinyPNG](https://tinypng.com)
- Keep files under 50KB

## Next Steps

- [Themes](/docs/customization/themes) - Customize colors
- [Configuration](/docs/customization/configuration) - Full config guide
- [Navbar](/docs/customization/navbar) - Add navigation links
