# Scripts de LazyDocs

Este directorio contiene scripts de automatización para LazyDocs.

## generate-sidebar.js

Genera automáticamente el archivo `public/docs/sidebar.json` basándose en la estructura de carpetas y archivos en el directorio `docs/`.

### Características

- **Escaneo automático**: Lee todas las carpetas y archivos markdown en `docs/`
- **Lee frontmatter**: Extrae el título y orden desde el frontmatter de cada archivo
- **Ordenamiento inteligente**: Ordena páginas por `order` (si existe) y luego alfabéticamente
- **Conversión de nombres**: Convierte nombres de archivos como `quick-start.md` a "Quick Start"

### Uso

```bash
# Ejecutar manualmente
npm run generate-sidebar

# Se ejecuta automáticamente en:
npm run dev    # Antes de iniciar el servidor de desarrollo
npm run build  # Antes de hacer el build de producción
```

### Ejemplo de Frontmatter

```markdown
---
title: Mi Página Personalizada
order: 1
---

# Contenido...
```

- `title`: Título personalizado (opcional, usa el nombre del archivo si no se especifica)
- `order`: Orden de la página en la sección (opcional, 999 por defecto)

### Estructura Generada

El script genera un JSON con esta estructura:

```json
[
  {
    "type": "folder",
    "title": "Getting Started",
    "path": "/docs/getting-started",
    "children": [
      {
        "type": "file",
        "title": "Introduction",
        "path": "/docs/getting-started/introduction"
      }
    ]
  }
]
```

## generate-sitemap.js

Genera el archivo `public/sitemap.xml` para SEO.

### Uso

```bash
npm run sitemap
```

Se ejecuta automáticamente durante `npm run build`.
