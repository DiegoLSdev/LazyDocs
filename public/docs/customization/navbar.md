---
title: Navbar Customization
description: Add custom links to the top navigation bar
---

# Navbar Customization

Add links to the top navigation bar via `public/config.json`.

## Basic Setup

Edit `public/config.json`:

```json
{
  "navbar": {
    "links": [
      {
        "label": "Docs",
        "to": "/docs/getting-started/introduction"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/username/repo"
      }
    ]
  }
}
```

## Link Types

### Internal Links

Use `to` for pages within your site:

```json
{
  "label": "Docs",
  "to": "/docs/getting-started/introduction"
}
```

- No page reload (React Router)
- Fast navigation
- Keeps user on site

### External Links

Use `href` for external URLs:

```json
{
  "label": "GitHub",
  "href": "https://github.com/username/repo"
}
```

- Opens in new tab automatically
- Can point anywhere
- Good for social media, repos, etc.

## Examples

### Simple Navbar

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

### Complete Navbar

```json
{
  "navbar": {
    "links": [
      { "label": "Home", "to": "/" },
      { "label": "Docs", "to": "/docs" },
      { "label": "API", "to": "/docs/api" },
      { "label": "Blog", "href": "https://blog.example.com" },
      { "label": "GitHub", "href": "https://github.com/user/repo" }
    ]
  }
}
```

### With Social Links

```json
{
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs" },
      { "label": "GitHub", "href": "https://github.com/user/repo" },
      { "label": "Twitter", "href": "https://twitter.com/username" },
      { "label": "Discord", "href": "https://discord.gg/invite" }
    ]
  }
}
```

## Footer Links

Configure footer the same way:

```json
{
  "footer": {
    "copyright": "© 2025 Your Company",
    "links": [
      { "label": "Documentation", "to": "/docs" },
      { "label": "Terms", "to": "/docs/terms" },
      { "label": "Privacy", "to": "/docs/privacy" },
      { "label": "Contact", "href": "mailto:hello@example.com" }
    ]
  }
}
```

## Best Practices

### Keep It Simple

**Good - 3-5 links:**
```
Docs | API | Blog | GitHub
```

**Too many - overwhelming:**
```
Home | Docs | Guides | API | Blog | FAQ | Support | Contact | GitHub | Twitter | Discord
```

### Order by Importance

Most important links first:

```json
{
  "links": [
    { "label": "Docs", "to": "/docs" },        // Most important
    { "label": "API", "to": "/docs/api" },     // Important
    { "label": "Blog", "href": "..." },        // Secondary
    { "label": "GitHub", "href": "..." }       // Less important
  ]
}
```

### Use Short Labels

**Good:**
- "Docs"
- "API"
- "Blog"

**Avoid:**
- "Our Complete Documentation"
- "Full API Reference"

## Troubleshooting

### Links not appearing?

1. Validate JSON at [jsonlint.com](https://jsonlint.com)
2. Save `config.json`
3. Reload browser

### Internal links don't work?

Use `"to"` not `"href"` for internal links:

```json
✅ { "label": "Docs", "to": "/docs/page" }
❌ { "label": "Docs", "href": "/docs/page" }
```

### External links don't open in new tab?

Use `"href"` not `"to"`:

```json
✅ { "label": "GitHub", "href": "https://..." }
❌ { "label": "GitHub", "to": "https://..." }
```

## Next Steps

- [Configuration](/docs/customization/configuration) - Full config guide
- [Logo](/docs/customization/logo) - Add your logo
- [Themes](/docs/customization/themes) - Customize colors
