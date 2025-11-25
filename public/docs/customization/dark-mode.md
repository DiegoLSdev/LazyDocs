---
title: Dark Mode
description: Built-in dark mode with automatic detection and theme switcher
---

# Dark Mode

LazyDocs includes automatic dark mode. No configuration needed!

## How It Works

Dark mode is **built into each theme**. Every theme has:
- Light mode colors
- Dark mode colors
- Smooth transitions

## Toggle Dark Mode

Users can toggle dark mode with the **moon/sun icon** in the header.

**Features:**
- Saves user preference in localStorage
- Auto-detects system preference
- Smooth color transitions
- Persistent across sessions

## Keyboard Shortcut

No built-in keyboard shortcut, but users can click the toggle button.

## For Developers

### How Dark Mode is Applied

Each theme CSS file (e.g., `src/themes/bluewave.css`) contains:

```css
:root {
  /* Light mode colors */
  --background: 214 100% 97%;
  --foreground: 213 27% 12%;
}

.dark {
  /* Dark mode colors */
  --background: 213 27% 12%;
  --foreground: 214 100% 97%;
}
```

The `useDarkMode` hook toggles the `dark` class on the `<html>` element.

### System Preference Detection

LazyDocs detects the user's system preference:

```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

If user hasn't chosen a preference, it uses system default.

### LocalStorage Key

Preference is saved as:
```javascript
localStorage.setItem('darkMode', 'true'); // or 'false'
```

## Customizing Dark Mode Colors

Edit your theme's CSS file in `src/themes/`:

```css
.dark {
  --background: 220 13% 9%;      /* Darker background */
  --foreground: 220 13% 98%;     /* Lighter text */
  --primary: 217 91% 60%;        /* Brighter primary for dark bg */
  --sidebar-background: 220 13% 12%;
}
```

See [Themes](/docs/customization/themes) for complete guide.

## Disabling Dark Mode

To hide the dark mode toggle:

1. Open `src/components/Header.jsx`
2. Remove or comment out the dark mode button:

```jsx
{/* <button onClick={toggleDarkMode}>
  {isDark ? <Sun /> : <Moon />}
</button> */}
```

## Testing Both Modes

Always test your customizations in both light and dark mode:

1. Click the moon/sun icon
2. Check all pages
3. Verify colors have good contrast
4. Test code blocks
5. Check images/logos

## Accessibility

Dark mode follows accessibility best practices:
- Maintains WCAG contrast ratios
- Smooth transitions (no jarring changes)
- Respects user preferences
- No flash of unstyled content

## Troubleshooting

### Toggle not working?

1. Check browser console for errors
2. Verify `useDarkMode` hook is imported in `App.jsx`
3. Clear localStorage: `localStorage.removeItem('darkMode')`

### Dark mode looks broken?

1. Verify theme CSS has `.dark` selector
2. Check all CSS variables are defined for both `:root` and `.dark`
3. Clear browser cache

### Preference not persisting?

1. Check localStorage is enabled
2. Not using incognito mode
3. localStorage key is 'darkMode'

## Next Steps

- [Themes](/docs/customization/themes) - Customize colors
- [Configuration](/docs/customization/configuration) - Site settings
