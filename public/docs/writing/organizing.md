---
title: Organizing Content
description: Best practices for structuring and organizing your documentation
---

Good documentation structure makes it easy for users to find what they need. This guide will help you organize your content effectively.

## Folder Structure

### Basic Structure

Organize your documentation into logical sections:

```
docs/
├── getting-started/
│   ├── introduction.md
│   ├── installation.md
│   └── quick-start.md
├── guides/
│   ├── basics.md
│   ├── intermediate.md
│   └── advanced.md
├── api/
│   ├── overview.md
│   ├── authentication.md
│   └── endpoints.md
└── sidebar.json
```

### Deep Nesting

You can create nested folder structures:

```
docs/
├── getting-started/
├── user-guide/
│   ├── basics/
│   │   ├── introduction.md
│   │   └── first-steps.md
│   └── advanced/
│       ├── configuration.md
│       └── optimization.md
└── api/
    ├── rest/
    │   ├── overview.md
    │   └── endpoints.md
    └── graphql/
        ├── overview.md
        └── queries.md
```

## Naming Conventions

### File Names

Use clear, descriptive file names:

**Good:**
- `installation.md`
- `getting-started.md`
- `api-authentication.md`

**Not recommended:**
- `page1.md`
- `doc.md`
- `misc.md`

### Folder Names

Use lowercase with hyphens:

**Good:**
- `getting-started/`
- `user-guide/`
- `api-reference/`

**Not recommended:**
- `GettingStarted/`
- `user_guide/`
- `API Reference/`

## Sidebar Configuration

The `sidebar.json` file controls your navigation structure:

### Basic Sidebar

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
      },
      {
        "type": "file",
        "title": "Installation",
        "path": "/docs/getting-started/installation"
      }
    ]
  }
]
```

### Nested Sidebar

```json
[
  {
    "type": "folder",
    "title": "User Guide",
    "path": "/docs/user-guide",
    "children": [
      {
        "type": "folder",
        "title": "Basics",
        "path": "/docs/user-guide/basics",
        "children": [
          {
            "type": "file",
            "title": "Introduction",
            "path": "/docs/user-guide/basics/introduction"
          },
          {
            "type": "file",
            "title": "First Steps",
            "path": "/docs/user-guide/basics/first-steps"
          }
        ]
      },
      {
        "type": "folder",
        "title": "Advanced",
        "path": "/docs/user-guide/advanced",
        "children": [
          {
            "type": "file",
            "title": "Configuration",
            "path": "/docs/user-guide/advanced/configuration"
          }
        ]
      }
    ]
  }
]
```

## Content Organization Strategies

### By User Journey

Organize content based on the user's learning path:

```
docs/
├── 1-getting-started/
├── 2-basic-concepts/
├── 3-common-tasks/
├── 4-advanced-topics/
└── 5-reference/
```

### By Feature

Organize content by product features:

```
docs/
├── authentication/
├── data-management/
├── notifications/
├── reporting/
└── integrations/
```

### By User Type

Organize content by user role:

```
docs/
├── for-developers/
├── for-administrators/
├── for-end-users/
└── for-designers/
```

### Hybrid Approach

Combine multiple strategies:

```
docs/
├── getting-started/
├── guides/
│   ├── for-developers/
│   ├── for-admins/
│   └── for-users/
├── features/
│   ├── authentication/
│   ├── analytics/
│   └── integrations/
└── api/
```

## Page Order

### Sidebar Order

Pages appear in the order they're listed in `sidebar.json`:

```json
{
  "children": [
    { "title": "First page", "path": "/docs/page1" },
    { "title": "Second page", "path": "/docs/page2" },
    { "title": "Third page", "path": "/docs/page3" }
  ]
}
```

### Numbering (Optional)

You can use number prefixes in filenames if you want:

```
guides/
├── 01-introduction.md
├── 02-setup.md
├── 03-basics.md
└── 04-advanced.md
```

Then reference them in sidebar.json without the numbers:

```json
{
  "title": "Introduction",
  "path": "/docs/guides/01-introduction"
}
```

## Documentation Sections

### Essential Sections

Most documentation sites should include:

1. **Getting Started**
   - Introduction
   - Installation
   - Quick start

2. **Guides/Tutorials**
   - Step-by-step walkthroughs
   - Common use cases

3. **Reference**
   - API documentation
   - Configuration options
   - CLI commands

4. **Advanced Topics**
   - In-depth explanations
   - Best practices
   - Performance optimization

### Optional Sections

Depending on your needs:

- **FAQ** - Common questions
- **Troubleshooting** - Problem solving
- **Examples** - Code samples
- **Changelog** - Version history
- **Migration Guides** - Upgrading between versions

## Best Practices

### 1. Start Broad, Get Specific

```
docs/
├── overview.md           # High-level overview
├── getting-started/      # Basic concepts
├── guides/               # Detailed guides
└── reference/            # Detailed reference
```

### 2. Keep Related Content Together

Group related topics in the same folder:

```
authentication/
├── overview.md
├── login.md
├── logout.md
├── password-reset.md
└── social-auth.md
```

### 3. Limit Nesting Depth

Avoid more than 3-4 levels of nesting:

**Good:**
```
docs/guides/basics/introduction.md
```

**Too deep:**
```
docs/section/subsection/category/subcategory/topic/page.md
```

### 4. Use Clear Section Names

**Good:**
- Getting Started
- User Guide
- API Reference

**Not clear:**
- Miscellaneous
- Other
- Additional

### 5. Include Index Pages

Create an index/overview page for each major section:

```
api/
├── overview.md          # API overview
├── authentication.md
├── endpoints.md
└── errors.md
```

## Example Structure

Here's a complete example structure:

```
docs/
├── getting-started/
│   ├── introduction.md
│   ├── installation.md
│   ├── quick-start.md
│   └── basic-concepts.md
├── user-guide/
│   ├── overview.md
│   ├── dashboard.md
│   ├── projects.md
│   └── settings.md
├── developer-guide/
│   ├── architecture.md
│   ├── api-overview.md
│   ├── authentication.md
│   └── webhooks.md
├── api-reference/
│   ├── overview.md
│   ├── endpoints/
│   │   ├── users.md
│   │   ├── projects.md
│   │   └── files.md
│   └── errors.md
├── deployment/
│   ├── overview.md
│   ├── docker.md
│   ├── kubernetes.md
│   └── cloud-providers.md
└── sidebar.json
```

## Navigation Tips

### Breadcrumbs

Consider adding breadcrumbs to help users understand where they are:

```
Home > User Guide > Advanced > Configuration
```

### Next/Previous Links

Add navigation to related pages:

```markdown
---

**Previous:** [Installation](/docs/getting-started/installation)
**Next:** [Basic Concepts](/docs/getting-started/basics)
```

### Cross-References

Link related pages within content:

```markdown
For more information about authentication,
see [Authentication Guide](/docs/api/authentication).
```

## Maintenance

### Regular Reviews

- Review structure quarterly
- Remove outdated content
- Update cross-references
- Consolidate similar pages

### Keep it Simple

- Start simple, add complexity as needed
- Don't over-organize
- Focus on user needs

## Next Steps

- [Start writing with Markdown](/docs/writing/markdown)
- [Customize your theme](/docs/customization/themes)
