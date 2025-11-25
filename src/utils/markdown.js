import fm from 'front-matter';

export async function loadMarkdownFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}`);
    }

    const text = await response.text();
    const { attributes: frontmatter, body: content } = fm(text);

    return {
      frontmatter,
      content
    };
  } catch (error) {
    console.error('Error loading markdown file:', error);
    throw error;
  }
}

export function extractTitle(content) {
  // Try to extract title from first H1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1];
  }
  return null;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
