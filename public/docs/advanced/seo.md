---
title: SEO Optimization
description: Optimize your documentation site for search engines
keywords: seo, search engine optimization, meta tags, sitemap, robots.txt
---

# SEO Optimization

LazyDocs includes built-in SEO optimization features to help your documentation rank better in search engines like Google, Bing, and DuckDuckGo.

## Automatic SEO Features

### Dynamic Meta Tags

Every documentation page automatically includes:

- **Title tags** - Based on your markdown frontmatter
- **Meta descriptions** - From `description` in frontmatter
- **Keywords** - From `keywords` in frontmatter
- **Open Graph tags** - For social media sharing (Facebook, LinkedIn)
- **Twitter Cards** - For Twitter previews
- **Canonical URLs** - Prevents duplicate content issues
- **Structured Data (JSON-LD)** - Helps search engines understand your content

### Example Frontmatter

Add these fields to your markdown files for optimal SEO:

```markdown
---
title: Getting Started with LazyDocs
description: Learn how to install and configure LazyDocs in under 5 minutes
keywords: lazydocs, installation, getting started, documentation, setup
author: Your Name
---

# Getting Started with LazyDocs

Your content here...
```

**Fields:**
- `title` - Page title (required) - Shows in search results
- `description` - Page description (recommended) - Shows in search snippets
- `keywords` - Comma-separated keywords (optional) - Helps categorization
- `author` - Content author (optional) - Improves credibility

---

## Sitemap Configuration

### Generate Sitemap

LazyDocs automatically generates a `sitemap.xml` during the build process.

**Manual generation:**
```bash
npm run sitemap
```

This creates `/public/sitemap.xml` with all your documentation pages.

### Configure Your Domain

**Step 1:** Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

**Step 2:** Edit `.env` and set your domain:
```env
VITE_SITE_URL=https://docs.yourcompany.com
```

**Step 3:** Regenerate sitemap:
```bash
npm run sitemap
```

### Submit to Search Engines

After deployment, submit your sitemap to:

**Google Search Console:**
1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Go to "Sitemaps" → Add sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit sitemap URL

---

## Robots.txt

LazyDocs includes a `/public/robots.txt` file that tells search engines:

- ✅ All pages are allowed to be crawled
- 📍 Location of your sitemap
- ⏱️ Respectful crawl delay

**Default robots.txt:**
```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Customize robots.txt:**

Edit `/public/robots.txt` to block specific paths:

```txt
User-agent: *
Allow: /

# Block certain paths
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Social Media Preview

### Open Graph (Facebook, LinkedIn)

When someone shares your docs on social media, they'll see:

- **Title** - From frontmatter `title`
- **Description** - From frontmatter `description`
- **Image** - Custom OG image (see below)

### Twitter Cards

Optimized preview cards for Twitter/X with:
- Large image preview
- Title and description
- Link to your docs

### Custom OG Image

**Step 1:** Create an image (recommended size: 1200x630px)

**Step 2:** Save it as `/public/og-image.png`

**Step 3:** (Optional) Add custom images per page:

Edit your markdown frontmatter:
```markdown
---
title: My Page
description: Page description
image: /custom-og-image.png
---
```

---

## Best Practices

### 1. Write Descriptive Titles

**Good:**
```markdown
title: Install LazyDocs with npm in 3 Steps
```

**Bad:**
```markdown
title: Installation
```

### 2. Compelling Descriptions

Keep descriptions between 150-160 characters:

**Good:**
```markdown
description: Step-by-step guide to install, configure, and deploy LazyDocs. Includes examples for npm, yarn, and Docker.
```

**Bad:**
```markdown
description: How to install
```

### 3. Use Relevant Keywords

Include 3-5 relevant keywords:

```markdown
keywords: documentation, markdown, react, vite, static site generator
```

### 4. Semantic HTML

LazyDocs uses proper HTML5 semantic tags:
- `<article>` for documentation content
- `<nav>` for navigation
- `<aside>` for table of contents
- `<header>` and `<footer>`

### 5. Internal Linking

Link between your docs to improve SEO:

```markdown
Learn more about [customization](/docs/customization/themes).
```

### 6. Mobile-Friendly

LazyDocs is fully responsive - Google favors mobile-friendly sites.

### 7. Fast Loading

- Built with Vite for optimal performance
- Minimal JavaScript bundle
- Lazy loading where possible

---

## Monitoring SEO Performance

### Google Search Console

**Track:**
- How many pages are indexed
- Which search queries bring users
- Click-through rates (CTR)
- Mobile usability issues

### Google Analytics (Optional)

Add Google Analytics to track:
- Page views
- User behavior
- Traffic sources
- Popular content

**Add to `index.html`:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Troubleshooting

### Pages Not Indexed

**Solutions:**
1. Verify sitemap is accessible: `https://yourdomain.com/sitemap.xml`
2. Check robots.txt isn't blocking: `https://yourdomain.com/robots.txt`
3. Submit sitemap to Google Search Console
4. Wait 1-2 weeks for initial indexing

### Wrong Title/Description Showing

**Solutions:**
1. Clear browser cache
2. Check frontmatter syntax (YAML format)
3. Rebuild site: `npm run build`
4. Use [Facebook Debugger](https://developers.facebook.com/tools/debug/) to refresh cache

### Duplicate Content

**Solutions:**
- Canonical URLs are automatic in LazyDocs
- Ensure only one version of your site is live (not both www and non-www)

---

## Advanced: Structured Data

LazyDocs automatically includes JSON-LD structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Page Title",
  "description": "Your page description",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
```

This helps Google show:
- Rich snippets
- Breadcrumbs
- Author information
- Article metadata

**Test your structured data:**
[Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Checklist

Before deploying, ensure:

- [ ] Set `VITE_SITE_URL` in `.env` to your domain
- [ ] Run `npm run sitemap` to generate sitemap
- [ ] All markdown files have `title` and `description` in frontmatter
- [ ] Custom OG image created (`/public/og-image.png`)
- [ ] robots.txt updated with your domain
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools

---

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Documentation Types](https://schema.org/TechArticle)
