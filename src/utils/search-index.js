import Fuse from 'fuse.js';

const CACHE_KEY = 'lazydocs_search_index';
const CACHE_VERSION_KEY = 'lazydocs_search_version';
const CURRENT_VERSION = '1.0.0'; // Increment when index structure changes

/**
 * Search Index Manager
 * Handles indexing of all markdown files and fuzzy search
 */
class SearchIndex {
  constructor() {
    this.index = null;
    this.fuse = null;
    this.documents = [];
  }

  /**
   * Build search index from all markdown files
   * @param {string} docsPath - Base path for docs
   * @returns {Promise<void>}
   */
  async buildIndex(docsPath = 'docs') {
    try {
      // Try to load from cache first
      const cached = this.loadFromCache();
      if (cached) {
        this.documents = cached.documents;
        this.fuse = new Fuse(this.documents, this.getFuseOptions());
        console.log('✅ Search index loaded from cache:', this.documents.length, 'documents');
        return;
      }

      console.log('🔍 Building search index...');

      // Get all markdown files recursively
      const files = await this.getAllMarkdownFiles(docsPath);
      this.documents = await Promise.all(
        files.map(file => this.indexFile(file))
      );

      // Filter out null results (failed files)
      this.documents = this.documents.filter(doc => doc !== null);

      // Create Fuse instance
      this.fuse = new Fuse(this.documents, this.getFuseOptions());

      // Cache the index
      this.saveToCache();

      console.log('✅ Search index built:', this.documents.length, 'documents');
    } catch (error) {
      console.error('❌ Error building search index:', error);
      this.documents = [];
      this.fuse = null;
    }
  }

  /**
   * Get all markdown files from docs directory
   * @param {string} basePath - Base path
   * @returns {Promise<string[]>}
   */
  async getAllMarkdownFiles(basePath) {
    // This would need to be implemented based on your file structure
    // For now, we'll use a static list based on sidebar.json
    try {
      const response = await fetch('/docs/sidebar.json');
      const sidebar = await response.json();
      const files = [];

      const extractFiles = (items) => {
        items.forEach(item => {
          if (item.type === 'file') {
            files.push(item.path);
          } else if (item.type === 'folder' && item.children) {
            extractFiles(item.children);
          }
        });
      };

      extractFiles(sidebar);
      return files;
    } catch (error) {
      console.error('Error loading sidebar:', error);
      return [];
    }
  }

  /**
   * Index a single markdown file
   * @param {string} path - File path (e.g., /docs/getting-started/introduction)
   * @returns {Promise<Object|null>}
   */
  async indexFile(path) {
    try {
      const response = await fetch(`${path}.md`);
      if (!response.ok) return null;

      const text = await response.text();

      // Extract frontmatter and content
      const { frontmatter, content } = this.parseFrontmatter(text);

      // Extract headings
      const headings = this.extractHeadings(content);

      // Create search document
      return {
        path: path,
        title: frontmatter.title || this.extractTitleFromPath(path),
        description: frontmatter.description || '',
        keywords: frontmatter.keywords || '',
        section: this.extractSection(path),
        content: this.stripMarkdown(content),
        headings: headings,
        url: path,
      };
    } catch (error) {
      console.error(`Error indexing ${path}:`, error);
      return null;
    }
  }

  /**
   * Parse frontmatter from markdown
   * @param {string} text - Markdown text
   * @returns {Object}
   */
  parseFrontmatter(text) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: {}, content: text };
    }

    const frontmatterText = match[1];
    const content = match[2];

    // Simple YAML parser for basic fields
    const frontmatter = {};
    frontmatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        frontmatter[key] = value;
      }
    });

    return { frontmatter, content };
  }

  /**
   * Extract headings from markdown content
   * @param {string} content - Markdown content
   * @returns {Array<Object>}
   */
  extractHeadings(content) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      headings.push({
        level,
        text,
        id,
      });
    }

    return headings;
  }

  /**
   * Strip markdown formatting
   * @param {string} text - Markdown text
   * @returns {string}
   */
  stripMarkdown(text) {
    return text
      .replace(/^#{1,6}\s+/gm, '') // Headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
      .replace(/\*(.+?)\*/g, '$1') // Italic
      .replace(/`(.+?)`/g, '$1') // Inline code
      .replace(/```[\s\S]*?```/g, '') // Code blocks
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
      .replace(/!\[.*?\]\(.+?\)/g, '') // Images
      .substring(0, 500); // Limit length for search
  }

  /**
   * Extract section from path
   * @param {string} path - File path
   * @returns {string}
   */
  extractSection(path) {
    const parts = path.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return parts[1].split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return 'Documentation';
  }

  /**
   * Extract title from path as fallback
   * @param {string} path - File path
   * @returns {string}
   */
  extractTitleFromPath(path) {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  /**
   * Get Fuse.js configuration
   * @returns {Object}
   */
  getFuseOptions() {
    return {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'keywords', weight: 2 },
        { name: 'headings.text', weight: 1.5 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.3, // Lower = more strict
      ignoreLocation: true,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    };
  }

  /**
   * Search the index
   * @param {string} query - Search query
   * @returns {Array<Object>}
   */
  search(query) {
    if (!this.fuse || !query || query.length < 2) {
      return [];
    }

    const results = this.fuse.search(query);

    // Format results
    return results.map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches,
      // Extract snippet with highlighted match
      snippet: this.extractSnippet(result.item.content, query),
    }));
  }

  /**
   * Extract snippet around match
   * @param {string} content - Full content
   * @param {string} query - Search query
   * @returns {string}
   */
  extractSnippet(content, query) {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, 150) + '...';
    }

    const start = Math.max(0, index - 60);
    const end = Math.min(content.length, index + query.length + 90);

    let snippet = content.substring(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';

    return snippet;
  }

  /**
   * Save index to localStorage
   */
  saveToCache() {
    try {
      const data = {
        version: CURRENT_VERSION,
        timestamp: Date.now(),
        documents: this.documents,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
      console.log('💾 Search index cached');
    } catch (error) {
      console.warn('Failed to cache search index:', error);
    }
  }

  /**
   * Load index from localStorage
   * @returns {Object|null}
   */
  loadFromCache() {
    try {
      const cachedVersion = localStorage.getItem(CACHE_VERSION_KEY);
      if (cachedVersion !== CURRENT_VERSION) {
        console.log('🔄 Cache version mismatch, rebuilding index');
        return null;
      }

      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached);

      // Check if cache is older than 1 day
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      if (data.timestamp < oneDayAgo) {
        console.log('⏰ Cache expired, rebuilding index');
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Failed to load cached index:', error);
      return null;
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_VERSION_KEY);
    console.log('🗑️ Search cache cleared');
  }
}

// Singleton instance
const searchIndex = new SearchIndex();

export default searchIndex;
