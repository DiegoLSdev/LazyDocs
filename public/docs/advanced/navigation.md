---
title: Enhanced Navigation
description: Learn about the navigation features that make your documentation easier to explore
keywords: navigation, breadcrumbs, page navigation, reading progress, UX
author: LazyDocs Team
---

# Enhanced Navigation

LazyDocs includes powerful navigation features that make it easy for users to explore your documentation and track their progress.

## Overview

The navigation system includes:
- **Breadcrumbs** - Show the path from homepage to current page
- **Page Navigation** - Previous/Next page links for sequential reading
- **Reading Progress** - Visual indicator showing scroll progress

All these features are automatically enabled and require no configuration!

---

## Breadcrumbs

Breadcrumbs appear at the top of each documentation page, showing the navigation path from the homepage to the current page.

### Features

- **Automatic generation** from URL structure
- **Home icon** for the root page
- **Clickable links** for easy navigation back through the path
- **Current page** highlighted (not clickable)
- **Accessible** with proper ARIA labels
- **Responsive** design for mobile devices

### Example

For a page at `/docs/advanced/navigation`, breadcrumbs show:
```
Home > Docs > Advanced > Navigation
```

### Customization

The breadcrumbs component automatically:
- Converts URL segments to readable text (e.g., `getting-started` → "Getting Started")
- Capitalizes each word
- Hides on the homepage (not needed there)

---

## Page Navigation

At the bottom of each documentation page, you'll find Previous and Next page links that guide users through your documentation in the order defined by your sidebar structure.

### Features

- **Sequential navigation** following sidebar order
- **Smart display** - only shows when prev/next pages exist
- **Page titles** shown for context
- **Visual direction** indicators with chevron icons
- **Hover effects** with smooth transitions
- **Keyboard accessible** for better UX

### How It Works

The page navigation component:
1. Flattens your sidebar structure into a sequential list
2. Finds the current page's position
3. Shows links to the previous and next pages

This makes it easy for users to read through your documentation in a logical order without constantly referring to the sidebar.

### Layout

```
┌─────────────────────────────────────────────────┐
│ ← Previous                             Next →  │
│   Getting Started              Advanced Search │
└─────────────────────────────────────────────────┘
```

---

## Reading Progress

A visual progress indicator appears at the top of the page, showing how far the user has scrolled through the current document.

### Features

- **Fixed position** at the very top of the viewport
- **Smooth animation** as user scrolls
- **Primary color** matching your theme
- **Minimal height** (1px) to avoid distraction
- **Accessible** with proper ARIA attributes
- **Performance optimized** with passive event listeners

### Technical Details

The reading progress bar:
- Calculates scroll percentage based on document height
- Updates in real-time as the user scrolls
- Uses `position: fixed` to stay visible while scrolling
- Styled with the primary theme color automatically

### Customization

The reading progress component is defined in `src/components/ReadingProgress.jsx`. You can customize:
- Bar height (default: `h-1` / 4px)
- Bar color (default: `bg-primary`)
- Position (default: top of page)
- Animation speed (default: 150ms)

Example customization in `ReadingProgress.jsx`:
```jsx
<div className="h-2 bg-gradient-to-r from-primary to-purple-600">
  {/* Thicker bar with gradient */}
</div>
```

### Alternative: Circular Progress Indicator

LazyDocs also includes a circular "scroll to top" button with progress indicator. To use it instead:

1. Open `src/App.jsx`
2. Replace `<ReadingProgress />` with:
```jsx
import { ReadingProgressCircle } from './components/ReadingProgress';

// In the component:
<ReadingProgressCircle />
```

This shows a circular button in the bottom-right corner that:
- Only appears after scrolling 100px
- Shows scroll progress as a circle
- Clicks to scroll back to top
- Includes a smooth scroll animation

---

## Navigation Best Practices

### 1. Logical Structure

Organize your sidebar in a logical order that makes sense for sequential reading:
- Start with "Getting Started" or "Introduction"
- Progress from basic to advanced concepts
- Group related topics together

### 2. Clear Page Titles

Use descriptive page titles that make sense in breadcrumbs and page navigation:
- ✅ "Installing LazyDocs"
- ❌ "Install"

### 3. Appropriate Depth

Don't nest pages too deeply:
- ✅ `docs/guides/advanced/deployment.md`
- ❌ `docs/section/category/subcategory/topic/page.md`

Excessive nesting makes breadcrumbs long and navigation confusing.

### 4. Consistent Naming

Use consistent naming conventions:
- Use hyphens for multi-word URLs: `getting-started` not `getting_started`
- Be consistent with capitalization in frontmatter titles
- Use plural for collections: `guides` not `guide`

---

## Accessibility

All navigation components are built with accessibility in mind:

### Breadcrumbs
- Uses semantic `<nav>` and `<ol>` elements
- Includes `aria-label="Breadcrumb"`
- Current page has `aria-current="page"`
- Chevron separators have `aria-hidden="true"`

### Page Navigation
- Uses semantic `<nav>` element
- Includes `aria-label="Page navigation"`
- Clear visual and text indicators for direction

### Reading Progress
- Includes ARIA progress bar attributes
- `role="progressbar"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `aria-label="Reading progress"`

### Keyboard Navigation

All navigation links are keyboard accessible:
- Tab through breadcrumb links
- Tab to prev/next page links
- Enter to activate links
- Standard browser keyboard shortcuts work

---

## Performance

Navigation components are optimized for performance:

### Breadcrumbs
- Generated from URL (no API calls)
- Memoized to prevent unnecessary re-renders
- Minimal DOM elements

### Page Navigation
- Structure loaded once and cached
- No external API calls
- Conditional rendering (only when needed)

### Reading Progress
- Uses passive scroll listeners
- Debounced scroll updates
- Minimal repaints with CSS transforms
- No layout thrashing

---

## Troubleshooting

### Breadcrumbs not showing

1. Check that you're not on the homepage (they're hidden there)
2. Verify your routing is working correctly
3. Check browser console for errors

### Page navigation showing wrong pages

1. Verify your `sidebar.json` structure is correct
2. Check that file paths match sidebar paths exactly
3. Ensure sidebar is being loaded in `App.jsx`

### Reading progress bar not visible

1. Check if it's covered by other fixed elements
2. Verify the z-index is high enough (default: 50)
3. Check if custom CSS is overriding the component
4. Ensure the primary color is different from your background

### Page navigation not updating

1. The component depends on `structure` prop
2. Verify structure is being passed from `App.jsx`
3. Check that `generateSidebarStructure` is working
4. Look for console errors during structure generation

---

## What's Next?

Explore other advanced features:

- [Advanced Search](/docs/advanced/search) - Full-text search with fuzzy matching
- [Interactive MDX Components](/docs/advanced/mdx-components) - Enhanced documentation components
- [SEO Optimization](/docs/advanced/seo) - Make your docs discoverable

---

## Feedback

Have ideas for improving navigation? We'd love to hear from you:

- Open an issue on GitHub
- Submit a pull request
- Join our community discussions

Happy documenting! 🧭
