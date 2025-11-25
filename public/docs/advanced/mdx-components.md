---
title: Interactive MDX Components
description: Learn how to use interactive components in your documentation
keywords: mdx, components, interactive, callout, tabs, code, cards, steps, accordion
author: LazyDocs Team
---

# Interactive MDX Components

LazyDocs comes with a rich set of interactive components that you can use directly in your markdown files. These components help you create more engaging and professional documentation.

## Overview

### Enhanced Markdown Features (Available Now)

All `.md` files automatically include:
- **Enhanced code blocks** with syntax highlighting, copy button, and line numbers
- **Styled headings** with better typography and anchor links
- **Beautiful links** with primary color and hover effects
- **Improved tables** with borders and hover states
- **Styled lists and blockquotes**

These enhancements work immediately in all your markdown files!

### Interactive Components (Coming Soon)

Advanced interactive components like Callouts, Tabs, Cards, Steps, and Accordions are built and ready. Full integration with markdown files is coming in a future update. For now, you can import and use these components in custom React pages.

## Callout

Highlight important information with beautiful callout boxes.

### Types

Available types: `info`, `warning`, `error`, `success`, `tip`

### Usage

```jsx
<Callout type="info" title="Did you know?">
This is an informational callout. Great for tips and helpful hints!
</Callout>

<Callout type="warning">
This is a warning message. Use it to alert users about potential issues.
</Callout>

<Callout type="error" title="Critical Error">
Something went wrong! Use this for error messages and critical alerts.
</Callout>

<Callout type="success">
Success! Use this to confirm successful operations.
</Callout>

<Callout type="tip">
Pro tip: This component supports markdown inside!
</Callout>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `info` | Type of callout: `info`, `warning`, `error`, `success`, `tip` |
| `title` | `string` | Auto | Optional title (defaults based on type) |
| `children` | `node` | - | Content to display (supports markdown) |

---

## Tabs

Create tabbed content for organizing information into switchable views.

### Usage

```jsx
<TabsGroup defaultValue="npm">
  <TabList>
    <Tab value="npm" label="npm" />
    <Tab value="yarn" label="Yarn" />
    <Tab value="pnpm" label="pnpm" />
  </TabList>

  <TabPanel value="npm">

\`\`\`bash
npm install lazydocs
\`\`\`

  </TabPanel>

  <TabPanel value="yarn">

\`\`\`bash
yarn add lazydocs
\`\`\`

  </TabPanel>

  <TabPanel value="pnpm">

\`\`\`bash
pnpm add lazydocs
\`\`\`

  </TabPanel>
</TabsGroup>
```

### Components

#### TabsGroup

Container for the entire tabs component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | Default active tab (required) |
| `children` | `node` | - | TabList and TabPanel components |

#### TabList

Container for tab triggers.

#### Tab

Individual tab trigger button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique identifier (required) |
| `label` | `string` | - | Display text |

#### TabPanel

Content container for each tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Must match Tab value (required) |
| `children` | `node` | - | Content to display |

---

## CodeBlock

Enhanced code blocks with syntax highlighting and copy functionality.

### Usage

````jsx
<CodeBlock
  language="javascript"
  filename="example.js"
  showLineNumbers={true}
  highlightLines="2,4-6"
>
{`function greet(name) {
  console.log('Hello, ' + name);

  if (name === 'World') {
    console.log('Welcome to LazyDocs!');
  }
}`}
</CodeBlock>
````

### Features

- 🎨 Syntax highlighting for 150+ languages
- 📋 One-click copy button
- 📁 Optional filename display
- 🔢 Line numbers
- ✨ Line highlighting
- 🌗 Dark mode support

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | - | Code to display |
| `language` | `string` | `javascript` | Programming language for syntax highlighting |
| `filename` | `string` | - | Optional filename to display |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `highlightLines` | `string` | - | Lines to highlight (e.g., "1,3-5") |

### Supported Languages

JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, PHP, Ruby, Swift, Kotlin, SQL, HTML, CSS, JSON, YAML, Markdown, Bash, and many more!

---

## Card & CardGrid

Create beautiful cards for features, links, or call-to-actions.

### Single Card

```jsx
<Card
  title="Getting Started"
  description="Learn the basics of LazyDocs in just 5 minutes"
  href="/docs/getting-started/introduction"
/>
```

### Card with External Link

```jsx
<Card
  title="GitHub Repository"
  description="Check out our source code and contribute"
  link="https://github.com/yourusername/lazydocs"
/>
```

### Featured Card

```jsx
<Card
  title="Premium Features"
  description="Unlock advanced capabilities with our premium tier"
  featured={true}
  href="/docs/premium"
/>
```

### Card Grid

Display multiple cards in a responsive grid:

```jsx
<CardGrid cols={3}>
  <Card
    title="Fast Setup"
    description="Get your docs running in minutes"
  />
  <Card
    title="Fully Customizable"
    description="Tailor everything to match your brand"
  />
  <Card
    title="SEO Optimized"
    description="Built-in SEO best practices"
  />
</CardGrid>
```

### Props

#### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `description` | `string` | - | Card description |
| `icon` | `component` | - | Lucide icon component |
| `href` | `string` | - | Internal link (React Router) |
| `link` | `string` | - | External link (opens in new tab) |
| `featured` | `boolean` | `false` | Makes card stand out with primary colors |

#### CardGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number` | `3` | Number of columns (2, 3, or 4) |
| `children` | `node` | - | Card components |

---

## Steps

Display sequential instructions with numbered steps.

### Usage

```jsx
<Steps>
  <Step title="Install Dependencies">
    First, install LazyDocs using your preferred package manager:

    \`\`\`bash
    npm install lazydocs
    \`\`\`
  </Step>

  <Step title="Configure Your Site">
    Create a `config.json` file in your project root with your site settings.
  </Step>

  <Step title="Add Your Content">
    Create markdown files in the `docs` folder and start writing!
  </Step>

  <Step title="Launch">
    Run the development server:

    \`\`\`bash
    npm run dev
    \`\`\`
  </Step>
</Steps>
```

### Props

#### Steps

Container component (no props needed).

#### Step

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Step title |
| `children` | `node` | - | Step content (supports markdown) |

---

## Accordion

Create collapsible sections to organize content efficiently.

### Usage

```jsx
<AccordionGroup type="single" collapsible={true} defaultValue="item-1">
  <AccordionSection value="item-1" title="What is LazyDocs?">
    LazyDocs is a modern documentation platform built with React and Tailwind CSS.
    It provides a beautiful, fast, and customizable way to create documentation sites.
  </AccordionSection>

  <AccordionSection value="item-2" title="How do I get started?">
    Getting started is easy! Just install LazyDocs, configure your site settings,
    and start writing markdown files.
  </AccordionSection>

  <AccordionSection value="item-3" title="Can I customize the theme?">
    Absolutely! LazyDocs is built with Tailwind CSS and supports complete theme
    customization through CSS variables.
  </AccordionSection>
</AccordionGroup>
```

### Multiple Sections Open

```jsx
<AccordionGroup type="multiple" defaultValue={["faq-1", "faq-3"]}>
  <AccordionSection value="faq-1" title="Question 1">
    Answer to question 1
  </AccordionSection>

  <AccordionSection value="faq-2" title="Question 2">
    Answer to question 2
  </AccordionSection>

  <AccordionSection value="faq-3" title="Question 3">
    Answer to question 3
  </AccordionSection>
</AccordionGroup>
```

### Props

#### AccordionGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `single` | `single` (only one open) or `multiple` (many can be open) |
| `defaultValue` | `string\|array` | - | Default open item(s) |
| `collapsible` | `boolean` | `true` | Allow collapsing all items (for `type="single"`) |

#### AccordionSection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique identifier (required) |
| `title` | `string` | - | Section title/trigger text (required) |
| `children` | `node` | - | Section content (supports markdown) |

---

## Best Practices

### 1. Use Callouts Sparingly

Don't overuse callouts - they're meant to highlight important information. Too many callouts can overwhelm readers.

✅ **Good:**
```jsx
<Callout type="warning">
Make sure to backup your data before proceeding.
</Callout>
```

❌ **Bad:**
```jsx
<Callout type="info">Every</Callout>
<Callout type="info">Single</Callout>
<Callout type="info">Paragraph</Callout>
```

### 2. Choose Appropriate Components

- Use **Tabs** for alternative ways to do the same thing (npm/yarn/pnpm)
- Use **Steps** for sequential processes that must be done in order
- Use **Accordion** for optional information or FAQs
- Use **Cards** for feature highlights or navigation

### 3. Keep Content Readable

Make sure your enhanced components improve readability rather than hinder it. Always provide clear, concise content within components.

### 4. Consistent Styling

When using cards or callouts, maintain consistent styling throughout your documentation for a professional appearance.

---

## Combining Components

You can nest components to create rich, interactive documentation:

```jsx
<Callout type="tip" title="Installation Guide">

<Steps>
  <Step title="Choose Your Package Manager">

  <TabsGroup defaultValue="npm">
    <TabList>
      <Tab value="npm" label="npm" />
      <Tab value="yarn" label="Yarn" />
    </TabList>

    <TabPanel value="npm">
      \`npm install lazydocs\`
    </TabPanel>

    <TabPanel value="yarn">
      \`yarn add lazydocs\`
    </TabPanel>
  </TabsGroup>

  </Step>

  <Step title="Run the setup">
    Execute the setup command to initialize your project.
  </Step>
</Steps>

</Callout>
```

---

## Troubleshooting

### Components Not Rendering

If components aren't rendering:

1. Make sure you're using the exact component names (case-sensitive)
2. Check that you've closed all component tags properly
3. Verify that special characters in content are properly escaped

### Styling Issues

If styling looks incorrect:

1. Clear your browser cache
2. Make sure Tailwind CSS is properly loaded
3. Check for conflicts with custom CSS

### Need Help?

If you encounter issues with MDX components, please:

1. Check the component examples in this documentation
2. Review the component source code in `src/components/mdx/`
3. Open an issue on our GitHub repository

---

## What's Next?

Now that you know how to use interactive components, explore:

- [Advanced Search](/docs/advanced/search) - Full-text search capabilities
- [SEO Optimization](/docs/advanced/seo) - Make your docs discoverable
- [Customization](/docs/customization/themes) - Tailor the look and feel

Happy documenting! 🚀
