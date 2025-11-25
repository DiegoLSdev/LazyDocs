// This file generates the sidebar structure by reading the docs directory structure
// In a real implementation, this would scan the filesystem
// For this static version, we'll use a manifest approach

export async function generateSidebarStructure(docsPath) {
  try {
    const response = await fetch(`/${docsPath}/sidebar.json`);
    if (!response.ok) {
      throw new Error('Failed to load sidebar structure');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading sidebar structure:', error);
    // Return default structure
    return [
      {
        type: 'folder',
        title: 'Getting Started',
        path: '/docs/getting-started',
        children: [
          {
            type: 'file',
            title: 'Introduction',
            path: '/docs/getting-started/introduction'
          },
          {
            type: 'file',
            title: 'Installation',
            path: '/docs/getting-started/installation'
          },
          {
            type: 'file',
            title: 'Quick Start',
            path: '/docs/getting-started/quick-start'
          }
        ]
      },
      {
        type: 'folder',
        title: 'Customization',
        path: '/docs/customization',
        children: [
          {
            type: 'file',
            title: 'Configuration',
            path: '/docs/customization/configuration'
          },
          {
            type: 'file',
            title: 'Themes',
            path: '/docs/customization/themes'
          },
          {
            type: 'file',
            title: 'Logo and Branding',
            path: '/docs/customization/branding'
          }
        ]
      },
      {
        type: 'folder',
        title: 'Writing Docs',
        path: '/docs/writing',
        children: [
          {
            type: 'file',
            title: 'Markdown Guide',
            path: '/docs/writing/markdown'
          },
          {
            type: 'file',
            title: 'Frontmatter',
            path: '/docs/writing/frontmatter'
          },
          {
            type: 'file',
            title: 'Organizing Content',
            path: '/docs/writing/organizing'
          }
        ]
      }
    ];
  }
}

export function flattenStructure(structure) {
  const result = [];

  function traverse(items) {
    for (const item of items) {
      if (item.type === 'file') {
        result.push(item);
      } else if (item.type === 'folder' && item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(structure);
  return result;
}
