---
title: Sidebar Organization
description: Auto-generated sidebar from your folder structure
---

# Sidebar Organization

The sidebar is **automatically generated** from your folder structure in `public/docs/`.

## How It Works

1. Create folders and `.md` files in `public/docs/`
2. Run `npm run generate-sidebar`
3. Sidebar updates automatically!

**No manual editing needed!**

## Basic Example

### 1. Create Structure

```
public/docs/
├── getting-started/
│   ├── introduction.md
│   ├── installation.md
│   └── quick-start.md
└── guides/
    ├── basics.md
    └── advanced.md
```

### 2. Generate Sidebar

```bash
npm run generate-sidebar
```

### 3. Result

Sidebar automatically shows:

```
Getting Started
  - Introduction
  - Installation
  - Quick Start
Guides
  - Basics
  - Advanced
```

## Control Folder Order

By default, folders appear alphabetically. To customize:

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

Folders appear in this order.

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

Pages with lower numbers appear first.

## Page Titles

Titles come from frontmatter:

```markdown
---
title: Complete Installation Guide
---

# Installation
```

Sidebar shows: "Complete Installation Guide"

Without frontmatter, uses filename: `installation.md` → "Installation"

## Nested Folders

Create subfolders for deeper structure:

```
docs/
└── api/
    ├── overview.md
    ├── authentication/
    │   ├── oauth.md
    │   └── api-keys.md
    └── endpoints/
        ├── users.md
        └── projects.md
```

Generates:

```
API
  - Overview
  Authentication
    - OAuth
    - API Keys
  Endpoints
    - Users
    - Projects
```

## Best Practices

### 1. Limit Nesting

**Good - 2-3 levels:**
```
docs/guides/advanced/configuration.md
```

**Too deep:**
```
docs/section/category/subcategory/topic/page.md
```

### 2. Use Clear Names

**Good:**
- `getting-started/`
- `user-guide/`
- `api-reference/`

**Avoid:**
- `misc/`
- `other/`
- `temp/`

### 3. Consistent Naming

Use hyphens, all lowercase:

**Good:**
- `getting-started.md`
- `api-reference.md`

**Avoid:**
- `Getting_Started.md`
- `APIReference.md`

## Generated File

The script creates `public/docs/sidebar.json`:

```json
[
  {
    "type": "folder",
    "title": "Getting Started",
    "path": "/docs/getting-started",
    "children": [
      {
        "type": "file",
        "title": "Introduction",
        "path": "/docs/getting-started/introduction"
      }
    ]
  }
]
```

**Don't edit this file manually!** Run `npm run generate-sidebar` instead.

## Regenerate Sidebar

Sidebar auto-generates during:
- `npm run dev` (development)
- `npm run build` (production)

**Manual regeneration:**
```bash
npm run generate-sidebar
```

## Troubleshooting

### Page not in sidebar?

1. Verify file is in `public/docs/`
2. File has `.md` extension
3. Run `npm run generate-sidebar`
4. Restart dev server

### Wrong order?

**For folders:** Edit `_sidebar-order.json`

**For pages:** Add `order` to frontmatter

### Sidebar empty?

1. Check files exist in `public/docs/`
2. Run `npm run generate-sidebar`
3. Check console for errors

## Next Steps

- [Auto Sidebar](/docs/customization/auto-sidebar) - Technical details
- [Configuration](/docs/customization/configuration) - Config guide
- [Quick Start](/docs/getting-started/quick-start) - Create first page
