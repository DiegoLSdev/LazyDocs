# 🚀 Guía de Deployment a Vercel

Esta guía te ayudará a deployar tu sitio de documentación LazyDocs en Vercel de forma rápida y sencilla.

## 📋 Requisitos Previos

- Una cuenta en [Vercel](https://vercel.com) (es gratis)
- Tu repositorio subido a GitHub, GitLab o Bitbucket
- Node.js 16 o superior (solo para desarrollo local)

## 🎯 Método 1: Deploy con un Click (Recomendado)

La forma más rápida de deployar LazyDocs:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DiegoLSdev/LazyDocs)

1. **Haz click en el botón "Deploy with Vercel"** de arriba
2. **Conecta tu cuenta** de GitHub/GitLab/Bitbucket
3. **Clona el repositorio** - Vercel creará una copia en tu cuenta
4. **Configura las variables de entorno** (opcional, ver abajo)
5. **¡Haz click en Deploy!** 🎉

Tu sitio estará listo en ~2 minutos en una URL tipo: `https://tu-proyecto.vercel.app`

## 🛠️ Método 2: Deploy desde tu Repositorio Existente

Si ya tienes el proyecto clonado y con tus cambios:

### Paso 1: Preparar tu Repositorio

```bash
# Asegúrate de que todos tus cambios estén en GitHub
git add .
git commit -m "Preparado para deploy"
git push origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en **"Add New Project"**
3. Selecciona **"Import Git Repository"**
4. Busca y selecciona tu repositorio de LazyDocs
5. Click en **"Import"**

### Paso 3: Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica que la configuración sea:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

> ℹ️ **Nota**: No necesitas cambiar nada, el archivo `vercel.json` ya tiene todo configurado.

### Paso 4: Variables de Entorno (Opcional)

Si quieres configurar tu dominio personalizado para SEO:

1. Click en **"Environment Variables"**
2. Agrega la variable:
   - **Name**: `VITE_SITE_URL`
   - **Value**: `https://tu-dominio-vercel.vercel.app`

### Paso 5: Deploy

1. Click en **"Deploy"**
2. Espera ~2 minutos mientras Vercel construye tu sitio
3. ¡Listo! Obtendrás una URL como `https://tu-proyecto.vercel.app`

## 🌐 Método 3: Deploy desde la Terminal (Vercel CLI)

Para desarrolladores que prefieren la línea de comandos:

### Instalar Vercel CLI

```bash
npm install -g vercel
```

### Login en Vercel

```bash
vercel login
```

### Deploy

```bash
# Para preview (testing)
vercel

# Para producción
vercel --prod
```

## ⚙️ Configuración Post-Deploy

### Actualizar la URL del Sitio

1. Una vez deployado, copia tu URL de Vercel
2. En Vercel dashboard, ve a **Settings** → **Environment Variables**
3. Actualiza o agrega:
   - **Variable**: `VITE_SITE_URL`
   - **Value**: `https://tu-proyecto.vercel.app`
4. Haz un nuevo deploy para aplicar los cambios

### Dominio Personalizado

Para usar tu propio dominio (ej: `docs.tuempresa.com`):

1. En Vercel dashboard, ve a **Settings** → **Domains**
2. Click en **"Add"**
3. Ingresa tu dominio personalizado
4. Sigue las instrucciones para configurar el DNS

## 🔄 Deployments Automáticos

¡Buenas noticias! Una vez conectado, cada `git push` a tu rama principal deployará automáticamente:

```bash
# Haz tus cambios
git add .
git commit -m "Actualizar documentación"
git push

# Vercel automáticamente:
# 1. Detecta el push
# 2. Construye tu sitio
# 3. Deploya la nueva versión
# ✅ ¡Tu sitio se actualiza en ~2 minutos!
```

### Preview Deployments

Cada Pull Request también obtiene su propia preview URL automáticamente. Perfecto para revisar cambios antes de mergear.

## 🎨 Personalizar tu Sitio

Antes o después del deploy, personaliza tu sitio:

### 1. Editar Configuración

Edita `public/config.json`:

```json
{
  "siteName": "Tu Proyecto",
  "siteDescription": "Documentación de tu proyecto",
  "logo": "/logo.png",
  "navbar": {
    "links": [
      { "label": "Docs", "to": "/docs/getting-started/introduction" },
      { "label": "GitHub", "href": "https://github.com/tu-usuario/tu-repo" }
    ]
  },
  "theme": {
    "primaryColor": "#3b82f6",
    "secondaryColor": "#10b981"
  }
}
```

### 2. Agregar tu Logo

1. Coloca tu logo en la carpeta `public/`
2. Actualiza la ruta en `config.json`

### 3. Escribir tu Documentación

Reemplaza los archivos en `public/docs/` con tu propia documentación en Markdown.

## 📊 Monitoreo y Analytics

Vercel te proporciona automáticamente:

- **Analytics**: Visitas, páginas más vistas, etc.
- **Speed Insights**: Rendimiento de tu sitio
- **Logs**: Para debugging

Accede a todo desde tu Vercel dashboard.

## 🐛 Solución de Problemas

### Build Failed

**Error**: `Command "npm run build" failed`

**Solución**:
- Verifica que tu proyecto compile localmente: `npm run build`
- Revisa los logs en Vercel para ver el error específico
- Asegúrate de que todas las dependencias están en `package.json`

### Páginas 404

**Error**: Las rutas no funcionan (404)

**Solución**:
- El archivo `vercel.json` ya incluye las reglas de rewrite necesarias
- Si persiste, verifica que `vercel.json` esté en la raíz del proyecto

### Variables de Entorno no Funcionan

**Error**: `VITE_SITE_URL` no se aplica

**Solución**:
- En Vercel, ve a Settings → Environment Variables
- Asegúrate de que la variable empiece con `VITE_`
- Haz un nuevo deploy después de agregar variables

### Sitio Lento

**Solución**:
- Vercel ya optimiza automáticamente los assets
- El `vercel.json` incluye headers de cache óptimos
- Considera optimizar imágenes grandes en `public/`

## 💡 Tips y Mejores Prácticas

### 1. Usa Ramas para Desarrollo

```bash
# Crea una rama para cambios
git checkout -b feature/nueva-doc

# Haz cambios y commit
git add .
git commit -m "Agregar nueva documentación"

# Push para obtener preview
git push origin feature/nueva-doc

# Vercel creará una preview URL automáticamente
```

### 2. Variables de Entorno por Ambiente

- **Development**: `.env.local` (no commitear)
- **Production**: Configurar en Vercel dashboard

### 3. Optimizar Imágenes

Comprime imágenes antes de subirlas:
- Usa WebP cuando sea posible
- Mantén imágenes bajo 500KB
- Usa dimensiones apropiadas

### 4. Regenerar Sidebar

El sidebar se regenera automáticamente en cada build, pero puedes hacerlo manualmente:

```bash
npm run generate-sidebar
```

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Configurar Dominios](https://vercel.com/docs/concepts/projects/domains)

## ❓ ¿Necesitas Ayuda?

- 📚 [Documentación de LazyDocs](./README.md)
- 🐛 [Reportar un Bug](https://github.com/DiegoLSdev/LazyDocs/issues)
- 💬 [Discusiones](https://github.com/DiegoLSdev/LazyDocs/discussions)

---

**¡Eso es todo!** Tu documentación está ahora disponible globalmente con Vercel. 🌍✨

Haz cambios → Push → ¡Automáticamente deployado! 🚀
