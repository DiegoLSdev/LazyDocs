import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardGrid } from './mdx/Card';
import { Folder, FileText } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import SEO from './SEO';

/**
 * CategoryIndex component
 * Displays a grid of categories or documents based on the current route
 *
 * - /docs → shows all main categories
 * - /docs/category → shows all documents within that category
 */
function CategoryIndex({ structure = [], siteName = 'LazyDocs' }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine what to show based on the current path
  const getIndexData = () => {
    // If we're at /docs root, show all top-level categories (only folders)
    if (currentPath === '/docs' || currentPath === '/docs/') {
      return {
        title: 'Documentación',
        description: 'Explora todas las secciones de la documentación',
        items: structure
          .filter(item => item.type === 'folder') // Only show folders
          .map(item => ({
            title: item.title,
            path: item.path,
            type: item.type,
            description: item.description || `Documentación sobre ${item.title}`,
            children: item.children || []
          }))
      };
    }

    // Otherwise, find the matching category and show its children
    const findCategory = (items, path) => {
      for (const item of items) {
        if (item.path === path && item.type === 'folder') {
          return item;
        }
        if (item.children) {
          const found = findCategory(item.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(structure, currentPath);

    if (category && category.children) {
      return {
        title: category.title,
        description: category.description || `Contenido de ${category.title}`,
        items: category.children.map(child => ({
          title: child.title,
          path: child.path,
          type: child.type,
          description: child.description || child.title
        }))
      };
    }

    return null;
  };

  const indexData = getIndexData();

  // If no index data, return null (let DocContent handle it)
  if (!indexData || !indexData.items || indexData.items.length === 0) {
    return null;
  }

  return (
    <>
      <SEO
        title={indexData.title}
        description={indexData.description}
        siteName={siteName}
      />
      <div className="flex-1 max-w-4xl mx-auto px-6 py-6 lg:py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" />

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{indexData.title}</h1>
          <p className="text-xl text-muted-foreground">{indexData.description}</p>
        </div>

        {/* Grid of cards */}
        <CardGrid cols={3}>
          {indexData.items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              href={item.path}
              icon={item.type === 'folder' ? Folder : FileText}
            />
          ))}
        </CardGrid>
      </div>
    </>
  );
}

export default CategoryIndex;
