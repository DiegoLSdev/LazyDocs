import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { loadMarkdownFile } from '../utils/markdown';
import Breadcrumbs from './Breadcrumbs';
import PageNavigation from './PageNavigation';
import SEO from './SEO';
import { mdxComponents } from './MDXProvider';
import SkeletonLoader from './SkeletonLoader';
import CategoryIndex from './CategoryIndex';

function DocContent({ docsPath, siteName = 'LazyDocs', structure = [], onContentChange }) {
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCategoryIndex, setShowCategoryIndex] = useState(false);
  const location = useLocation();

  // Helper function to check if a path corresponds to a category
  const isCategoryPath = (path, structure) => {
    // /docs base path should always show category index
    if (path === '/docs' || path === '/docs/') {
      return true;
    }

    // Recursively search for matching folder path
    const findFolder = (items, targetPath) => {
      for (const item of items) {
        if (item.type === 'folder' && item.path === targetPath) {
          return true;
        }
        if (item.children) {
          if (findFolder(item.children, targetPath)) {
            return true;
          }
        }
      }
      return false;
    };

    return findFolder(structure, path);
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      setShowCategoryIndex(false);

      // Check if this is a category path FIRST before trying to load markdown
      const isCategory = isCategoryPath(location.pathname, structure);

      if (isCategory) {
        // Show category index
        setShowCategoryIndex(true);
        setContent('');
        if (onContentChange) {
          onContentChange('');
        }
        setLoading(false);
        return;
      }

      // Not a category, try to load markdown file
      try {
        // Convert URL path to file path
        const urlPath = location.pathname.replace('/docs/', '');
        const filePath = `/${docsPath}/${urlPath}.md`;

        const { content: mdContent, frontmatter: fm } = await loadMarkdownFile(filePath);
        setContent(mdContent);
        setFrontmatter(fm);

        // Notificar al componente padre sobre el cambio de contenido
        if (onContentChange) {
          onContentChange(mdContent);
        }
      } catch (err) {
        console.error('Error loading markdown:', err);
        // Show 404 error
        setError('Page not found or could not be loaded.');
        setContent('');
        if (onContentChange) {
          onContentChange('');
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [location.pathname, docsPath, onContentChange, structure]);

  if (loading) {
    return (
        <div className="flex-1 mx-auto px-6 py-6 lg:py-10 w-full">
          <SkeletonLoader />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex-1 p-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
    );
  }

  // Show category index if this is a category path
  if (showCategoryIndex) {
    return <CategoryIndex structure={structure} siteName={siteName} />;
  }

  return (
      <>
        <SEO
            title={frontmatter.title}
            description={frontmatter.description}
            keywords={frontmatter.keywords}
            article={true}
            author={frontmatter.author}
            siteName={siteName}
        />
        <div className="flex-1 max-w-4xl mx-auto px-6 py-6 lg:py-10 w-full">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6" />

          <article className="prose prose-slate dark:prose-invert">
            {frontmatter.title && (
                <div className="space-y-2 not-prose mb-8">
                  <h1 className="text-4xl font-bold tracking-tight">{frontmatter.title}</h1>
                  {frontmatter.description && (
                      <p className="text-xl text-muted-foreground">{frontmatter.description}</p>
                  )}
                </div>
            )}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeRaw]}
                components={mdxComponents}
            >
              {content}
            </ReactMarkdown>

            {/* Page Navigation */}
            <PageNavigation structure={structure} className="not-prose" />
          </article>
        </div>
      </>
  );
}

export default DocContent;