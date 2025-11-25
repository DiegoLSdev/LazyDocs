---
title: Themes & Colors
description: Choose from 4 beautiful pre-built themes or customize your own
---

# Themes & Colors

LazyDocs includes 4 professionally designed themes. Switch themes instantly via `config.json`.

## Available Themes

### 🟤 Brownie (Default)

Warm, professional brown/tan color scheme.

**Best for:** Technical docs, coding tutorials, business content

**Colors:**
- Light mode: Warm beige backgrounds, rich brown text
- Dark mode: Deep coffee tones, cream accents
- Syntax highlighting: Earth tones (amber, olive, terracotta)

**Use:**
```json
{
  "colorTheme": "brownie"
}
```

---

### 🟢 Greenleaf

Fresh, natural green/sage color scheme.

**Best for:** Eco-friendly projects, health/wellness, sustainability topics

**Colors:**
- Light mode: Soft sage backgrounds, forest green text
- Dark mode: Deep forest tones, mint accents
- Syntax highlighting: Natural greens (emerald, lime, teal)

**Use:**
```json
{
  "colorTheme": "greenleaf"
}
```

---

### 🔵 Bluewave

Professional, trustworthy blue/ocean color scheme.

**Best for:** Corporate docs, tech startups, API docs, SaaS products

**Colors:**
- Light mode: Sky blue backgrounds, navy text
- Dark mode: Deep ocean blue, bright blue accents
- Syntax highlighting: Cool tones (blue, cyan, teal)

**Use:**
```json
{
  "colorTheme": "bluewave"
}
```

---

### ⚫⚪ Panda

Minimalist black/white color scheme.

**Best for:** Design-focused docs, minimalist sites, editorial content

**Colors:**
- Light mode: Pure white backgrounds, black text
- Dark mode: Deep black, white text, subtle gray accents
- Syntax highlighting: Monochrome with colorful code

**Use:**
```json
{
  "colorTheme": "panda"
}
```

---

## How to Change Theme

### Step 1: Edit Config

Open `public/config.json`:

```json
{
  "siteName": "My Docs",
  "colorTheme": "bluewave",
  ...
}
```

### Step 2: Save & Reload

1. Save the file
2. Reload browser (or restart dev server)
3. Theme applies automatically!

## Theme Comparison

| Theme | Vibe | Best Use | Temperature |
|-------|------|----------|-------------|
| 🟤 Brownie | Cozy, reliable | Technical/Professional | Warm |
| 🟢 Greenleaf | Fresh, organic | Natural/Eco | Neutral |
| 🔵 Bluewave | Professional, trustworthy | Corporate/Tech | Cool |
| ⚫⚪ Panda | Clean, timeless | Minimal/Editorial | Neutral |

## Dark Mode

All themes include built-in dark mode! Users can toggle with the moon/sun icon in the header.

**Dark mode features:**
- Auto-detects system preference
- Saves user choice in localStorage
- Smooth transition between modes
- Each theme has custom dark variants

## Creating Custom Themes

Want your own colors? Create a custom theme:

### 1. Create Theme File

Copy an existing theme as template:

```bash
cp src/themes/brownie.css src/themes/mytheme.css
```

### 2. Customize Colors

Edit `src/themes/mytheme.css`. The themes use CSS variables in HSL format:

```css
@layer base {
  :root {
    /* Light mode */
    --background: 30 40% 98%;
    --foreground: 20 14.3% 4.1%;
    --primary: 24 9.8% 10%;
    --sidebar-background: 30 40% 98%;
    /* Code colors */
    --code-background: 250 250 249;
    --code-keyword: 180 83 9;
    --code-string: 21 128 61;
  }

  .dark {
    /* Dark mode */
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --primary: 30 60% 65%;
    --sidebar-background: 28 25 23%;
    /* Dark code colors */
    --code-background: 28 25 23;
    --code-keyword: 251 146 60;
    --code-string: 134 239 172;
  }
}
```

### 3. Register Theme

Add to `src/utils/themeLoader.js`:

```javascript
const themes = {
  brownie: () => import('@/themes/brownie.css'),
  greenleaf: () => import('@/themes/greenleaf.css'),
  bluewave: () => import('@/themes/bluewave.css'),
  panda: () => import('@/themes/panda.css'),
  mytheme: () => import('@/themes/mytheme.css'), // Add here
};
```

### 4. Use Your Theme

Update `config.json`:

```json
{
  "colorTheme": "mytheme"
}
```

## Understanding HSL Colors

Themes use HSL format: `Hue Saturation% Lightness%`

**Hue (0-360):** Color wheel position
- 0° = Red
- 120° = Green
- 240° = Blue

**Saturation (0-100%):** Color intensity
- 0% = Grayscale
- 100% = Vivid color

**Lightness (0-100%):** Brightness
- 0% = Black
- 50% = Pure color
- 100% = White

**Example:**
```css
--primary: 210 60% 50%; /* Blue (210°), moderate saturation, medium brightness */
```

Use [hslpicker.com](https://hslpicker.com) to pick colors visually.

## Best Practices

### 1. Maintain Contrast

Ensure text is readable:

✅ **Good:**
```css
--background: 0 0% 98%;   /* Very light */
--foreground: 0 0% 9%;    /* Very dark */
```

❌ **Bad:**
```css
--background: 0 0% 70%;   /* Medium gray */
--foreground: 0 0% 60%;   /* Similar gray - poor contrast */
```

### 2. Test Both Modes

Always check light AND dark mode. Toggle the theme switcher to verify.

### 3. Consistent Palette

Use colors from the same family for professional appearance:

```css
--primary: 210 60% 50%;      /* Blue */
--secondary: 215 50% 60%;    /* Light blue */
--accent: 205 70% 45%;       /* Darker blue */
```

## Troubleshooting

### Theme not changing?

1. **Check spelling:** Theme name is case-sensitive
   ```json
   ✅ "colorTheme": "bluewave"
   ❌ "colorTheme": "BlueWave"
   ```

2. **Clear cache:** Hard refresh (Ctrl+Shift+R)

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Colors look wrong?

1. **Check HSL format:**
   ```css
   ✅ --primary: 210 60% 50%;
   ❌ --primary: hsl(210, 60%, 50%);  /* Don't include hsl() wrapper */
   ❌ --primary: #3b82f6;              /* Don't use hex */
   ```

2. **Verify all variables defined** in both `:root` (light) and `.dark`

3. **Check for syntax errors** (missing %, extra commas)

## Next Steps

- [Logo & Branding](/docs/customization/branding) - Add your logo
- [Configuration](/docs/customization/configuration) - Edit config.json
- [Navbar](/docs/customization/navbar) - Customize navigation
