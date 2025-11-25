---
title: Markdown Guide
description: Complete guide to writing documentation with Markdown
---

# Markdown Guide

LazyDocs uses Markdown for writing documentation. This guide covers all the Markdown features supported.

## Headings

Use `#` symbols to create headings:

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

## Text Formatting

**Bold text** using `**bold text**` or `__bold text__`

*Italic text* using `*italic text*` or `_italic text_`

***Bold and italic*** using `***bold and italic***`

~~Strikethrough~~ using `~~strikethrough~~`

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

Result:
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2
```

Result:
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

Result:
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Links

Internal link: `[Link text](/docs/page)`

External link: `[Link text](https://example.com)`

Link with title: `[Link text](https://example.com "Link title")`

Examples:
- [Go to Introduction](/docs/getting-started/introduction)
- [Visit GitHub](https://github.com)

## Images

```markdown
![Alt text](/images/example.png)
![Alt text](/images/example.png "Image title")
```

Example:
![LazyDocs Logo](/logo.svg)

## Code

### Inline Code

Use backticks for inline code: `const x = 10;`

### Code Blocks

Use triple backticks with language specification:

````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
````

Result:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

### Supported Languages

LazyDocs supports syntax highlighting for many languages:

```python
def hello_world():
    print("Hello, World!")
```

```bash
npm install
npm run dev
```

```json
{
  "name": "lazydocs",
  "version": "1.0.0"
}
```

```html
<div class="container">
  <h1>Hello World</h1>
</div>
```

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

## Blockquotes

Use `>` for blockquotes:

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> — Author Name
```

Result:

> This is a blockquote.
> It can span multiple lines.
>
> — Author Name

Nested blockquotes:

```markdown
> Level 1 quote
>> Level 2 quote
>>> Level 3 quote
```

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |
```

Result:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |

### Table Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
```

Result:

| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |

## Horizontal Rules

Create horizontal rules with `---`, `***`, or `___`:

```markdown
---
```

Result:

---

## Escaping Characters

Use backslash `\` to escape special characters:

```markdown
\*Not italic\*
\#Not a heading
\[Not a link\]
```

Result:
\*Not italic\*
\#Not a heading
\[Not a link\]

## HTML in Markdown

You can use HTML directly in Markdown:

```markdown
<div style="color: blue;">
  This text is blue!
</div>

<details>
  <summary>Click to expand</summary>
  Hidden content here
</details>
```

Result:

<div style="color: blue;">
  This text is blue!
</div>

<details>
  <summary>Click to expand</summary>
  Hidden content here
</details>

## Best Practices

1. **Use headings hierarchically** - Don't skip heading levels
2. **Add blank lines** - Put blank lines around headings, lists, and code blocks
3. **Use descriptive links** - Avoid "click here", use descriptive text
4. **Alt text for images** - Always include descriptive alt text
5. **Code language specification** - Always specify the language for code blocks
6. **Consistent formatting** - Use consistent list markers (- or *)

## Example Page

Here's an example of a well-formatted documentation page:

```markdown
---
title: API Authentication
description: Learn how to authenticate with our API
---

# API Authentication

This guide explains how to authenticate your requests to the API.

## Overview

Our API uses **Bearer Token** authentication. You'll need to include your token in the `Authorization` header of every request.

## Getting Your Token

1. Log in to your account
2. Navigate to Settings > API Keys
3. Click "Generate New Token"

## Making Authenticated Requests

Include your token in the Authorization header:

bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/endpoint


## Example Code

Here's an example in JavaScript:

javascript
const token = 'your-token-here';

fetch('https://api.example.com/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data));


> **Note:** Keep your token secure and never commit it to version control.

## Next Steps

- [API Reference](/docs/api/reference)
- [Error Handling](/docs/api/errors)
```

## Next Steps

- [Learn about frontmatter](/docs/writing/frontmatter)
- [Organize your content](/docs/writing/organizing)
