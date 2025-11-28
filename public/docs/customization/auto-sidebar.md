---
title: Automatic Sidebar Generation
order: 1
description: Generates the sidebar structure.
---

LazyDocs now automatically generates the sidebar structure based on the markdown folders and files you have in the `docs/` directory.

## How It Works

The system automatically scans:
- **Folders** in `docs/` become sidebar sections
- **`.md` and `.mdx` files** within each folder become links

### Structure Example

```
docs/
├── getting-started/
│   ├── introduction.md
│   ├── installation.md
│   └── quick-start.md
├── customization/
│   ├── themes.md
│   └── configuration.md
└── advanced/
    └── seo.md
```

This will automatically generate a sidebar with three main sections:
- **Getting Started** (3 pages)
- **Customization** (2 pages)
- **Advanced** (1 page)

## Customizing Titles

By default, titles are generated from the file name. You can customize them using frontmatter:

```markdown
---
title: My Custom Title
order: 1
---

# Page content...
```

### Frontmatter Parameters

- `title`: The title that will appear in the sidebar (if not specified, uses the file name)
- `order`: Number to sort pages within a section (lower = first)

## Adding New Sections

To add a new section to your documentation:

1. Create a new folder in `docs/`:
   ```bash
   mkdir docs/my-new-section
   ```

2. Add markdown files inside:
   ```bash
   # Create a new file
   touch docs/my-new-section/my-first-page.md
   ```

3. Write your content with frontmatter:
   ```markdown
   ---
   title: My First Page
   order: 1
   ---

   # My First Page

   Content here...
   ```

4. Update the order in `docs/_sidebar-order.json` (see next section)

5. The sidebar will regenerate automatically when you run:
   ```bash
   npm run dev        # In development
   npm run build      # When building
   ```

## Controlling Folder Order

By default, folders are sorted alphabetically. To customize the order, edit the `docs/_sidebar-order.json` file:

```json
{
  "order": [
    "getting-started",
    "my-new-section",
    "customization",
    "writing",
    "advanced"
  ]
}
```

**Important:**
- Use the folder name exactly as it appears in the file system (e.g., `getting-started`, not `Getting Started`)
- Folders will appear in the specified order
- Folders not in the list will appear at the end in alphabetical order

### Example

If you have these folders:
- `docs/getting-started/`
- `docs/test/`
- `docs/customization/`

And you want "test" to appear second, your `_sidebar-order.json` would be:

```json
{
  "order": [
    "getting-started",
    "test",
    "customization"
  ]
}
```

## Manual Generation

If you need to manually regenerate the sidebar:

```bash
npm run generate-sidebar
```

This will create/update the `public/docs/sidebar.json` file based on your current folder structure.

## Deploying on Vercel

The sidebar is automatically generated during the build process, so you don't need to do anything special for Vercel. Simply:

1. Push your changes
2. Vercel will run `npm run build`
3. The sidebar will be generated automatically before the build

## Configuration File Locations

Configuration files are located at:
- `public/config.json` - General site configuration
- `public/docs/sidebar.json` - Sidebar structure (automatically generated)

These files are in `public/` so they are accessible in the production build.

## Troubleshooting

### Sidebar doesn't update

If you added new folders but they don't appear in the sidebar:

1. Verify that the folder contains `.md` or `.mdx` files
2. Manually regenerate: `npm run generate-sidebar`
3. Restart the development server

### Pages don't appear in order

Use the `order` parameter in the frontmatter to control the order:

```markdown
---
title: Introduction
order: 1
---
```

Pages without `order` will be sorted alphabetically at the end.