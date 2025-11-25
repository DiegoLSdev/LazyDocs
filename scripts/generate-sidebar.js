import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../public/docs');
const OUTPUT_FILE = path.join(__dirname, '../public/docs/sidebar.json');
const ORDER_CONFIG_FILE = path.join(__dirname, '../public/docs/_sidebar-order.json');

// Helper function to convert filename to title
function filenameToTitle(filename) {
  return filename
    .replace(/\.mdx?$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to convert directory name to title
function dirToTitle(dirname) {
  return dirname
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Read frontmatter from markdown file to get custom title if available
function getTitleFromFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
  } catch (error) {
    console.warn(`Could not read frontmatter from ${filePath}:`, error.message);
  }
  return null;
}

// Get order from frontmatter or use default
function getOrderFromFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const orderMatch = frontmatter.match(/order:\s*(\d+)/);
      if (orderMatch) {
        return parseInt(orderMatch[1], 10);
      }
    }
  } catch (error) {
    console.warn(`Could not read order from ${filePath}:`, error.message);
  }
  return 999; // Default high number for files without order
}

// Recursively scan directory and build structure
function scanDirectory(dir, basePath = '/docs') {
  const items = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Separate directories and files
    const directories = entries.filter(entry => entry.isDirectory());
    const files = entries.filter(entry => entry.isFile() && /\.mdx?$/.test(entry.name));

    // Process directories
    directories.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = `${basePath}/${entry.name}`;

      const children = scanDirectory(fullPath, relativePath);

      // Only add folder if it has markdown files
      if (children.length > 0) {
        items.push({
          type: 'folder',
          title: dirToTitle(entry.name),
          path: relativePath,
          children: children
        });
      }
    });

    // Process markdown files
    const fileItems = files.map(entry => {
      const fullPath = path.join(dir, entry.name);
      const filename = entry.name.replace(/\.mdx?$/, '');
      const relativePath = `${basePath}/${filename}`;

      // Try to get title from frontmatter, fallback to filename
      const title = getTitleFromFrontmatter(fullPath) || filenameToTitle(entry.name);
      const order = getOrderFromFrontmatter(fullPath);

      return {
        type: 'file',
        title: title,
        path: relativePath,
        order: order
      };
    });

    // Sort files by order, then by title
    fileItems.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });

    // Remove order property before adding to items
    fileItems.forEach(item => {
      delete item.order;
      items.push(item);
    });

  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }

  return items;
}

// Load custom folder order if exists
function loadFolderOrder() {
  try {
    if (fs.existsSync(ORDER_CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(ORDER_CONFIG_FILE, 'utf-8'));
      console.log('✓ Using custom folder order from _sidebar-order.json');
      return config.order || [];
    }
  } catch (error) {
    console.warn('Warning: Could not read _sidebar-order.json:', error.message);
  }
  return null;
}

// Sort folders according to custom order
function sortFolders(folders, customOrder) {
  if (!customOrder || customOrder.length === 0) {
    // Default: alphabetical order
    return folders.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Create a map of folder names to their order index
  const orderMap = {};
  customOrder.forEach((folderName, index) => {
    orderMap[folderName] = index;
  });

  return folders.sort((a, b) => {
    // Extract folder name from path (e.g., "/docs/getting-started" -> "getting-started")
    const aName = a.path.split('/').pop();
    const bName = b.path.split('/').pop();

    const aOrder = orderMap[aName] !== undefined ? orderMap[aName] : 999;
    const bOrder = orderMap[bName] !== undefined ? orderMap[bName] : 999;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // If same order or not in custom order, sort alphabetically
    return a.title.localeCompare(b.title);
  });
}

// Main function
function generateSidebar() {
  console.log('Generating sidebar structure...');

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load custom folder order
  const folderOrder = loadFolderOrder();

  // Generate structure
  let structure = scanDirectory(DOCS_DIR);

  // Sort folders according to custom order
  structure = sortFolders(structure, folderOrder);

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(structure, null, 2));

  console.log(`✓ Sidebar generated successfully at ${OUTPUT_FILE}`);
  console.log(`  Found ${structure.length} top-level sections`);

  // Count total files
  let totalFiles = 0;
  function countFiles(items) {
    items.forEach(item => {
      if (item.type === 'file') {
        totalFiles++;
      } else if (item.children) {
        countFiles(item.children);
      }
    });
  }
  countFiles(structure);
  console.log(`  Total ${totalFiles} documentation files`);
}

// Run the script
generateSidebar();
