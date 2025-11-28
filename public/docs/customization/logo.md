---
title: Logo & Branding
description: Add your logo with light and dark mode variants
---

## Logo Configuration

The logo in LazyDocs supports **separate images for light and dark mode**.

### Config Structure

In `public/config.json`:

```json
{
  "siteName": "My Docs",
  "logo": {
    "light": "/assets/logo/logo.png",
    "dark": "/assets/logo/logo-dark.png"
  }
}
```

### Logo Object Properties

- `light` - Logo shown in light mode
- `dark` - Logo shown in dark mode

**Tip:** If your logo works in both modes, use the same image:

```json
{
  "logo": {
    "light": "/assets/logo/logo.svg",
    "dark": "/assets/logo/logo.svg"
  }
}
```

## Adding Your Logo

### Step 1: Prepare Logo Files

**Recommended:**
- Format: SVG (scales perfectly) or PNG
- Size: 32-48px height
- Background: Transparent
- Two variants: one for light mode, one for dark mode

### Step 2: Place Files

Put your logo files in `public/assets/logo/`:

```
public/
└── assets/
    └── logo/
        ├── logo.png
        └── logo-dark.png
```

### Step 3: Update Config

Edit `public/config.json`:

```json
{
  "logo": {
    "light": "/assets/logo/logo.png",
    "dark": "/assets/logo/logo-dark.png"
  }
}
```

### Step 4: Reload

Save and reload your browser. Logo appears in the header!

## Title Image (Optional)

Want an image for your site title instead of text?

```json
{
  "title": {
    "light": "/assets/title/title-light.png",
    "dark": "/assets/title/title-dark.png"
  }
}
```

This shows an image instead of the `siteName` text.

## Favicon

Add a favicon (browser tab icon):

```json
{
  "favicon": "/favicon.ico"
}
```

**Create favicon:**
1. Use [favicon.io](https://favicon.io)
2. Size: 32x32px or 16x16px
3. Place in `public/`

## Troubleshooting

### Logo not showing?

1. Check file exists at path
2. Verify path starts with `/`
3. Check case-sensitive filename
4. Restart dev server

## Next Steps

- [Themes](/docs/customization/themes) - Choose colors
- [Configuration](/docs/customization/configuration) - Edit config
