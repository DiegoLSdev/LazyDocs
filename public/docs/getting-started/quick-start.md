---
title: Quick Start
description: Create your first documentation page in 3 minutes
---

## Your First Page

### 1. Create a Markdown File

In `public/docs/`, create a new file:

**File:** `public/docs/my-page.md`

```markdown
---
title: My First Page
description: This is my first documentation page
---

# My First Page

Welcome to my documentation!

## Features

- Easy to write
- Beautiful output
- Auto-generated sidebar

## Code Example

\`\`\`javascript
function hello() {
  console.log('Hello, LazyDocs!');
}
\`\`\`
```

### 2. Regenerate Sidebar

```bash
npm run generate-sidebar
```

This auto-generates `public/docs/sidebar.json` from your folder structure.

### 3. View Your Page

Open `http://localhost:5173/docs/my-page`

Your page is live! 🎉

## Add to a Section

Want to organize pages into folders?

### 1. Create Folder Structure

```bash
mkdir public/docs/guides
```

### 2. Add Files

**File:** `public/docs/guides/getting-started.md`

```markdown
---
title: Getting Started Guide
description: Learn the basics
---

# Getting Started Guide

Content here...
```

**File:** `public/docs/guides/advanced.md`

```markdown
---
title: Advanced Topics
description: Deep dive into features
---

# Advanced Topics

More content...
```

### 3. Regenerate Sidebar

```bash
npm run generate-sidebar
```

Now you have:
```
Guides/
  - Getting Started Guide
  - Advanced Topics
```

## Control Folder Order

By default, folders appear alphabetically. To customize order:

**Edit:** `public/docs/_sidebar-order.json`

```json
{
  "order": [
    "getting-started",
    "guides",
    "customization",
    "advanced"
  ]
}
```

Folders will appear in this order in the sidebar.

## Control Page Order

Use `order` in frontmatter:

```markdown
---
title: Introduction
order: 1
---
```

```markdown
---
title: Installation
order: 2
---
```

Pages with lower `order` appear first.

## Frontmatter Fields

```markdown
---
title: "Page Title"           # Required - Shows in sidebar & browser
description: "Short summary"  # Recommended - For SEO & search
keywords: "guide, tutorial"   # Optional - Helps search
author: "Your Name"           # Optional
order: 1                      # Optional - Control page order
---
```

## Markdown Features

LazyDocs supports full Markdown + extras:

- **Headings** - `#`, `##`, `###`
- **Bold** - `**text**`
- **Italic** - `*text*`
- **Links** - `[text](url)`
- **Images** - `![alt](/image.png)`
- **Code blocks** - With syntax highlighting
- **Tables** - GitHub-flavored markdown
- **Checklists** - `- [ ] Task`

See [Markdown Guide](/docs/writing/markdown) for full reference.

## Next Steps

**Customize Your Site:**
- [Change Theme](/docs/customization/themes) - Switch colors
- [Add Logo](/docs/customization/branding) - Upload your logo
- [Configure Site](/docs/customization/configuration) - Edit config.json

**Write Better Docs:**
- [Markdown Guide](/docs/writing/markdown) - All supported syntax
- [MDX Components](/docs/advanced/mdx-components) - Interactive elements
- [SEO](/docs/advanced/seo) - Optimize for search engines
