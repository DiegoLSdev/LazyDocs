---
title: Frontmatter
description: Add metadata to your documentation pages using frontmatter
---

# Frontmatter

Frontmatter allows you to add metadata to your Markdown pages. It's written in YAML format at the beginning of your file.

## What is Frontmatter?

Frontmatter is metadata about your page that appears between triple dashes (`---`) at the top of your Markdown file:

```markdown
---
title: Page Title
description: Page description
---

# Your content starts here
```

## Basic Usage

### Title

The page title appears at the top of the page and in the browser tab:

```markdown
---
title: Getting Started Guide
---
```

If you don't specify a title in frontmatter, LazyDocs will try to extract it from the first H1 heading in your content.

### Description

The description is displayed below the title as a subtitle:

```markdown
---
title: Installation
description: Step-by-step guide to installing LazyDocs
---
```

## Complete Example

Here's a typical page with frontmatter:

```markdown
---
title: API Reference
description: Complete API documentation for all endpoints
---

# API Reference

Welcome to the API documentation...
```

## Frontmatter Fields

### Required Fields

None of the frontmatter fields are strictly required, but it's recommended to include at least:

- `title` - The page title
- `description` - A brief description of the page

### Optional Fields

You can add custom fields for your own use:

```markdown
---
title: Advanced Features
description: Learn about advanced features
author: John Doe
date: 2025-01-15
tags: [advanced, features, tutorial]
---
```

**Note:** Custom fields won't be displayed by default but can be accessed if you modify the components.

## Best Practices

### 1. Always Include Title and Description

```markdown
---
title: Clear, Descriptive Title
description: Brief but informative description (1-2 sentences)
---
```

### 2. Keep Descriptions Concise

Good:
```markdown
---
description: Learn how to install and configure LazyDocs in 5 minutes
---
```

Not recommended:
```markdown
---
description: This is a very long description that goes on and on explaining everything in extreme detail which makes it hard to read and doesn't give a quick overview
---
```

### 3. Use Descriptive Titles

Good:
```markdown
---
title: Installing LazyDocs
---
```

Not recommended:
```markdown
---
title: Installation
---
```

### 4. YAML Syntax Rules

**Strings with special characters need quotes:**

```markdown
---
title: "Getting Started: A Complete Guide"
description: "LazyDocs makes it easy to create docs"
---
```

**Multi-line strings:**

```markdown
---
title: Advanced Configuration
description: >
  This is a longer description
  that spans multiple lines
  in the frontmatter.
---
```

**Arrays:**

```markdown
---
tags: [documentation, guide, tutorial]
---
```

Or:

```markdown
---
tags:
  - documentation
  - guide
  - tutorial
---
```

## Common Mistakes

### Missing Closing Dashes

Wrong:
```markdown
---
title: My Page
description: My description

# Content starts here
```

Correct:
```markdown
---
title: My Page
description: My description
---

# Content starts here
```

### Invalid YAML Syntax

Wrong:
```markdown
---
title: Getting Started: The Basics
---
```

Correct:
```markdown
---
title: "Getting Started: The Basics"
---
```

### Frontmatter Not at Top

Wrong:
```markdown
# My Page

---
title: My Page
---
```

Correct:
```markdown
---
title: My Page
---

# My Page
```

## Examples

### Simple Page

```markdown
---
title: Welcome
description: Welcome to our documentation
---

# Welcome

This is the welcome page content...
```

### Documentation Page

```markdown
---
title: API Authentication
description: Learn how to authenticate API requests using tokens
---

# API Authentication

Our API uses Bearer token authentication...
```

### Tutorial Page

```markdown
---
title: "Building Your First App"
description: Step-by-step tutorial for building your first application
---

# Building Your First App

In this tutorial, you'll learn...
```

## Extending Frontmatter

You can modify the `DocContent` component to display additional frontmatter fields. For example, to show an author and date:

1. Add fields to your Markdown:

```markdown
---
title: Advanced Tutorial
description: Learn advanced techniques
author: Jane Smith
date: 2025-01-15
---
```

2. Modify `src/components/DocContent.jsx` to display them:

```jsx
{frontmatter.author && (
  <p className="author">By {frontmatter.author}</p>
)}
{frontmatter.date && (
  <p className="date">{frontmatter.date}</p>
)}
```

## Next Steps

- [Learn about organizing your content](/docs/writing/organizing)
- [Complete Markdown guide](/docs/writing/markdown)
