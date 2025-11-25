---
title: Advanced Search System
description: Full-text search with fuzzy matching and instant results
keywords: search, fuzzy search, fuse.js, keyboard shortcuts, navigation
---

# Advanced Search System

LazyDocs includes a powerful full-text search system with fuzzy matching, instant results, and intelligent ranking.

## Features

- **⚡ Instant Search** - Results in <100ms
- **🔍 Fuzzy Matching** - Finds results even with typos
- **⌨️ Keyboard Navigation** - Full keyboard support
- **📱 Mobile Optimized** - Works great on all devices
- **💾 Smart Caching** - Index cached in localStorage
- **🎯 Intelligent Ranking** - Most relevant results first
- **✨ Highlighting** - Matched terms highlighted
- **📑 Categorized Results** - Grouped by section

---

## How to Use

### Opening Search

**Desktop:**
- Press `Cmd + K` (Mac) or `Ctrl + K` (Windows/Linux)
- Click the search bar in the header
- Click the "Search..." button

**Mobile:**
- Tap the search icon (🔍) in the header

### Searching

1. Type at least 2 characters
2. Results appear instantly as you type
3. Navigate with arrow keys (↑/↓)
4. Press `Enter` to open selected result
5. Press `Esc` to close search

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open search |
| `↓` | Move to next result |
| `↑` | Move to previous result |
| `Enter` | Open selected result |
| `Esc` | Close search dialog |

---

## Search Algorithm

### How It Works

LazyDocs uses [Fuse.js](https://fusejs.io/) for fuzzy search with the following strategy:

1. **Index Building:**
   - All markdown files are indexed on first load
   - Frontmatter (title, description, keywords) is extracted
   - Headings are indexed separately
   - Content is stripped of markdown formatting
   - Index is cached in localStorage

2. **Weighted Scoring:**
   - **Title** - 3x weight (highest priority)
   - **Description** - 2x weight
   - **Keywords** - 2x weight
   - **Headings** - 1.5x weight
   - **Content** - 1x weight

3. **Fuzzy Matching:**
   - Threshold: 0.3 (lower = more strict)
   - Minimum match length: 2 characters
   - Location agnostic (matches anywhere)

### What Gets Indexed

Every markdown file contributes:

```markdown
---
title: "Page Title"           # ← Indexed (3x weight)
description: "Page description" # ← Indexed (2x weight)
keywords: "react, docs"       # ← Indexed (2x weight)
---

# Main Heading               # ← Indexed (1.5x weight)

Content paragraph...          # ← Indexed (1x weight)

## Sub Heading                # ← Indexed (1.5x weight)
```

### Result Ranking

Results are sorted by:
1. **Relevance score** (from Fuse.js)
2. **Match quality** (exact > fuzzy)
3. **Field weight** (title > description > content)

---

## Performance

### Optimization Features

**Caching:**
- Index cached in localStorage after first build
- Cache expires after 24 hours
- Version-based cache invalidation

**Debouncing:**
- 150ms debounce on search input
- Prevents excessive re-renders
- Smoother UX on fast typing

**Lazy Loading:**
- Search index builds on first app load
- Minimal impact on initial page load
- Background indexing with loading indicator

**Result Limiting:**
- Top 10 results displayed
- Prevents DOM bloat
- Scroll performance optimized

### Performance Metrics

- **Index build time:** ~500ms for 50 docs
- **Search time:** <100ms for typical queries
- **Cache hit:** <10ms to load index
- **Memory usage:** ~2-5MB for index

---

## Customization

### Adjusting Search Sensitivity

Edit `src/utils/search-index.js`:

```javascript
getFuseOptions() {
  return {
    threshold: 0.3, // ← Lower = more strict (0.0 - 1.0)
    minMatchCharLength: 2, // ← Minimum characters to match
    // ...
  };
}
```

**Threshold Guide:**
- `0.0` - Perfect match only
- `0.3` - Moderate fuzzy (default)
- `0.6` - Very fuzzy (more typo-tolerant)

### Changing Field Weights

```javascript
keys: [
  { name: 'title', weight: 3 },        // ← Adjust weights
  { name: 'description', weight: 2 },
  { name: 'content', weight: 1 },
  // Add more fields...
]
```

### Indexing Custom Fields

Add custom frontmatter fields to index:

**1. Add to frontmatter:**
```markdown
---
title: "My Page"
author: "John Doe"
tags: ["tutorial", "advanced"]
---
```

**2. Update `indexFile()` in `search-index.js`:**
```javascript
return {
  path: path,
  title: frontmatter.title,
  author: frontmatter.author,    // ← Add custom field
  tags: frontmatter.tags,        // ← Add custom field
  // ...
};
```

**3. Add to Fuse.js keys:**
```javascript
keys: [
  { name: 'title', weight: 3 },
  { name: 'author', weight: 1.5 },  // ← Add to search
  { name: 'tags', weight: 2 },      // ← Add to search
  // ...
]
```

---

## Cache Management

### View Cache Status

```javascript
// Open browser console
localStorage.getItem('lazydocs_search_index') ? 'Cached' : 'Not cached'
```

### Clear Cache Manually

**Option 1: Via Console**
```javascript
// Clear search cache
localStorage.removeItem('lazydocs_search_index');
localStorage.removeItem('lazydocs_search_version');

// Reload page to rebuild
window.location.reload();
```

**Option 2: Via Code**
```javascript
import searchIndex from '@/utils/search-index';

// Clear and rebuild
searchIndex.clearCache();
await searchIndex.buildIndex();
```

### Cache Expiration

Cache automatically expires:
- After 24 hours
- When cache version changes
- When localStorage is cleared

---

## Troubleshooting

### Search Not Working

**Problem:** Search dialog doesn't open

**Solutions:**
1. Check keyboard shortcut: `Cmd/Ctrl + K`
2. Verify JavaScript is enabled
3. Check browser console for errors
4. Try clicking the search button directly

---

### No Results Found

**Problem:** Search returns no results for valid query

**Solutions:**
1. **Check index status:**
   - Wait for "Building search index..." to complete
   - Look for console message: "✅ Search index built: X documents"

2. **Verify content is indexed:**
   ```javascript
   import searchIndex from '@/utils/search-index';
   console.log(searchIndex.documents.length);
   ```

3. **Try exact match:**
   - Search for exact title from sidebar
   - Helps identify if issue is fuzzy matching or indexing

4. **Clear cache and rebuild:**
   ```javascript
   searchIndex.clearCache();
   window.location.reload();
   ```

---

### Slow Performance

**Problem:** Search is slow or laggy

**Solutions:**
1. **Check index size:**
   ```javascript
   console.log(searchIndex.documents.length);
   // If >200 docs, consider optimization
   ```

2. **Reduce content indexed:**
   - Limit content length in `stripMarkdown()`
   - Currently: 500 characters per document
   - Reduce for faster search

3. **Increase debounce:**
   - Edit `Search.jsx`
   - Change timeout from 150ms to 300ms

4. **Limit results:**
   - Currently showing top 10
   - Reduce if still slow

---

### Cache Issues

**Problem:** Old results showing after content update

**Solution:**
- Clear cache (see Cache Management)
- Update `CURRENT_VERSION` in `search-index.js` to force rebuild:
  ```javascript
  const CURRENT_VERSION = '1.0.1'; // ← Increment version
  ```

---

## Advanced Usage

### Programmatic Search

```javascript
import searchIndex from '@/utils/search-index';

// Build index
await searchIndex.buildIndex();

// Search
const results = searchIndex.search('react hooks');

// Results structure:
results.forEach(result => {
  console.log(result.title);      // Page title
  console.log(result.url);        // Page URL
  console.log(result.snippet);    // Matched snippet
  console.log(result.section);    // Section category
  console.log(result.score);      // Relevance score (lower = better)
});
```

### Custom Search UI

Build your own search interface:

```jsx
import { useState } from 'react';
import searchIndex from '@/utils/search-index';

function CustomSearch() {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    const searchResults = searchIndex.search(query);
    setResults(searchResults);
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {results.map(result => (
        <div key={result.url}>
          <a href={result.url}>{result.title}</a>
          <p>{result.snippet}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Technical Details

### Index Structure

```javascript
{
  path: "/docs/getting-started/introduction",
  title: "Introduction to LazyDocs",
  description: "Get started with LazyDocs in 5 minutes",
  keywords: "docs, markdown, react",
  section: "Getting Started",
  content: "LazyDocs is a modern documentation platform...",
  headings: [
    { level: 1, text: "Introduction", id: "introduction" },
    { level: 2, text: "Features", id: "features" }
  ],
  url: "/docs/getting-started/introduction"
}
```

### Dependencies

- **fuse.js** (v7.0.0+) - Fuzzy search library
- **react** (v18+) - UI framework
- **@radix-ui/react-dialog** - Accessible dialog primitive

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- localStorage
- ES6+ (async/await, arrow functions)
- Keyboard events

---

## Best Practices

### For Content Authors

1. **Write descriptive titles:**
   ```markdown
   # Installation Guide ✓
   # Install ✗
   ```

2. **Add rich frontmatter:**
   ```markdown
   ---
   title: "Complete Installation Guide for LazyDocs"
   description: "Step-by-step guide to install LazyDocs with npm, yarn, or Docker"
   keywords: "install, setup, npm, yarn, docker, getting started"
   ---
   ```

3. **Use clear headings:**
   ```markdown
   ## Prerequisites
   ## Installation Steps
   ## Troubleshooting
   ```

4. **Avoid duplicate content:**
   - Don't repeat title in first paragraph
   - Use synonyms for better search coverage

### For Developers

1. **Test search regularly:**
   - Try common user queries
   - Verify new content is indexed
   - Check ranking of important pages

2. **Monitor performance:**
   - Check index size as docs grow
   - Profile search on large doc sets
   - Optimize if search >200ms

3. **Version cache strategically:**
   - Increment version when changing index structure
   - Don't increment for content updates (auto-expires)

---

## Future Enhancements

Potential improvements:

- [ ] Search suggestions/autocomplete
- [ ] Recent searches history
- [ ] Search analytics (popular queries)
- [ ] Advanced filters (section, date, author)
- [ ] Synonyms and stop words
- [ ] Search result export
- [ ] Voice search
- [ ] Multi-language search

---

## Related Documentation

- [SEO Optimization](/docs/advanced/seo)
- [Keyboard Shortcuts](/docs/writing/shortcuts) (future)
- [Performance Optimization](/docs/advanced/performance) (future)

---

## Support

Having issues with search?

- 📝 [Open an issue](https://github.com/lazydocs/lazydocs/issues)
- 💬 [Join Discord](https://discord.gg/lazydocs)
- ⭐ [Star on GitHub](https://github.com/lazydocs/lazydocs)
