# LazyDocs

> Stop fighting with complex doc generators. Write markdown, deploy in one click, done.

LazyDocs is a lightweight documentation platform that makes it easy to create beautiful documentation websites. Simply clone the repository, write your docs in Markdown, and deploy!

You can see the [demo](https://my-lazy-docs.vercel.app/) here: 

## Features

- **Markdown-Based**: Write documentation using simple Markdown syntax
- **Folder Organization**: Organize content naturally with folders and subfolders
- **Fully Customizable**: Easy theming with colors, fonts, logos, and branding
- **Auto Navigation**: Sidebar automatically generated from your structure
- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Fast & Lightweight**: Built with React and Vite for optimal performance
- **Syntax Highlighting**: Beautiful code blocks with syntax highlighting
- **No Backend Required**: Pure static site that can be hosted anywhere

## Quick Start

### 🚀 Option 1: Deploy Directly to Vercel (Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DiegoLSdev/LazyDocs)

Click the button above to clone and deploy in one step. Your site will be live in 2 minutes!

### 💻 Option 2: Local Development

#### Prerequisites

- Node.js 16 or higher
- npm or yarn

#### Installation

1. **Clone this repository**

```bash
git clone https://github.com/DiegoLSdev/LazyDocs.git
cd lazydocs
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

Your documentation site will open at `http://localhost:3000`!

## Customization

### Change Site Name and Logo

1. **Add your logo** to the `public/` folder
2. **Edit `config.json`**:

```json
{
  "siteName": "Your Project Name",
  "logo": "/your-logo.svg"
}
```

### Customize Colors and Theme

Edit the `theme` section in `config.json`:

```json
{
  "theme": {
    "primaryColor": "#3b82f6",
    "secondaryColor": "#10b981",
    "fontFamily": "'Inter', sans-serif"
  }
}
```

**Available theme options:**
- `primaryColor` - Main accent color (links, active states)
- `secondaryColor` - Secondary accent color
- `backgroundColor` - Main background color
- `textColor` - Primary text color
- `sidebarBgColor` - Sidebar background
- `headerBgColor` - Header background
- `codeBlockBgColor` - Code block background
- `fontFamily` - Body font
- `headingFontFamily` - Heading font

### Change Navigation Links

Edit the `navbar` section in `config.json`:

```json
{
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs/getting-started/introduction" },
      { "label": "GitHub", "href": "https://github.com/yourrepo" }
    ]
  }
}
```

## Writing Documentation

### Create a New Page

1. **Create a Markdown file** in the `docs/` folder:

```markdown
---
title: My New Page
description: This is a description of my page
---

# My New Page

Content goes here...
```

2. **Add to sidebar** by editing `docs/sidebar.json`:

```json
{
  "type": "file",
  "title": "My New Page",
  "path": "/docs/my-new-page"
}
```

### Organize with Folders

Create nested folders for better organization:

```
docs/
├── getting-started/
│   ├── introduction.md
│   └── installation.md
├── guides/
│   ├── basics.md
│   └── advanced.md
└── api/
    └── reference.md
```

Update `docs/sidebar.json` to reflect your structure:

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

## Project Structure

```
lazydocs/
├── docs/                    # Your documentation (Markdown files)
│   ├── getting-started/
│   ├── customization/
│   ├── writing/
│   └── sidebar.json        # Navigation structure
├── public/                  # Static assets
│   ├── logo.svg            # Your logo
│   └── images/             # Images for docs
├── src/                     # Application source
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── DocContent.jsx
│   │   └── Footer.jsx
│   ├── utils/              # Utilities
│   │   ├── config.js
│   │   ├── markdown.js
│   │   └── sidebar.js
│   ├── App.jsx
│   └── main.jsx
├── config.json             # Site configuration
├── package.json
└── vite.config.js
```

## Building for Production

Build your site for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Deployment

### 🚀 Deploy to Vercel (Recomendado)

La forma más rápida de tener tu documentación en línea:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DiegoLSdev/LazyDocs)

**Click en el botón de arriba y tu sitio estará listo en 2 minutos!**

- ✅ Deploy automático con cada `git push`
- ✅ HTTPS gratis incluido
- ✅ CDN global para máxima velocidad
- ✅ Preview deployments para cada Pull Request

📖 **[Guía completa de deployment a Vercel](./DEPLOY.md)**

### Otras Plataformas

LazyDocs genera un sitio estático que puede ser deployado en cualquier servicio:

#### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

#### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### Any Static Host

Upload the contents of the `dist/` folder to your hosting provider.

## Documentation

For complete documentation on customization and usage, visit the built-in docs at:
- [Introduction](/docs/getting-started/introduction)
- [Installation](/docs/getting-started/installation)
- [Customization Guide](/docs/customization/configuration)
- [Themes & Colors](/docs/customization/themes)
- [Logo & Branding](/docs/customization/branding)

## Examples

The repository includes complete documentation as examples:

1. **Getting Started** - Introduction, installation, quick start
2. **Customization** - Configuration, themes, branding
3. **Writing** - Markdown guide, frontmatter, organizing content

Simply replace the content in `docs/` with your own!

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering
- **Gray Matter** - Frontmatter parsing
- **Highlight.js** - Syntax highlighting

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Support the Project ☕

LazyDocs is **100% free and open source**. If you find it useful and want to support its development, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow.svg?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/lazydocs)

Your support helps me:
- 🚀 Add new features
- 🐛 Fix bugs faster
- 📚 Improve documentation
- ⚡ Keep the project maintained

**Every coffee counts!** Even a small donation makes a big difference and motivates me to keep improving LazyDocs for everyone.

### Other Ways to Support

- ⭐ Star the repository on GitHub
- 🐦 Share LazyDocs on social media
- 📝 Write a blog post about your experience
- 🤝 Contribute code or documentation
- 💬 Help others in issues and discussions

## License

MIT License - feel free to use this for your own projects!

## Support

- Read the [complete documentation](http://localhost:3000/docs/getting-started/introduction)
- Check out the [examples](http://localhost:3000/docs)
- Open an issue for bugs or questions

---

**Built with LazyDocs** - Simple documentation made easy
# LazyDocs
# LazyDocs
# LazyDocs
# LazyDocs
# LazyDocs
