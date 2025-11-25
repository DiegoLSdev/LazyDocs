#!/usr/bin/env node

/**
 * Generador de sitemap.xml para LazyDocs
 *
 * Este script recorre todos los archivos .md en la carpeta docs/
 * y genera un sitemap.xml en la carpeta public/
 *
 * Uso: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const DOCS_DIR = path.join(__dirname, '../public/docs');
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = process.env.VITE_SITE_URL || 'https://yourdomain.com';

// Función para obtener todos los archivos .md recursivamente
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Función para convertir ruta de archivo a URL
function filePathToUrl(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const urlPath = relativePath
    .replace(/\\/g, '/') // Windows paths
    .replace(/\.md$/, ''); // Remove .md extension

  return `${BASE_URL}/docs/${urlPath}`;
}

// Función para obtener la fecha de última modificación
function getLastModified(filePath) {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString();
}

// Generar sitemap.xml
function generateSitemap() {
  console.log('Generando sitemap.xml...');

  const markdownFiles = getAllMarkdownFiles(DOCS_DIR);

  if (markdownFiles.length === 0) {
    console.warn('⚠️  No se encontraron archivos markdown en docs/');
    return;
  }

  // Iniciar XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Añadir página principal
  xml += '  <url>\n';
  xml += `    <loc>${BASE_URL}/</loc>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += '  </url>\n';

  // Añadir cada página de documentación
  markdownFiles.forEach((filePath) => {
    const url = filePathToUrl(filePath);
    const lastmod = getLastModified(filePath);

    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  // Cerrar XML
  xml += '</urlset>\n';

  // Escribir archivo
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');

  console.log(`✅ Sitemap generado exitosamente con ${markdownFiles.length} páginas`);
  console.log(`📄 Ubicación: ${OUTPUT_FILE}`);
  console.log(`🔗 URL base: ${BASE_URL}`);
  console.log('\n💡 Tip: Actualiza BASE_URL en .env con VITE_SITE_URL=https://tu-dominio.com');
}

// Ejecutar
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error al generar sitemap:', error);
  process.exit(1);
}
