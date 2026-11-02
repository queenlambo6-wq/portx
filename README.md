# PortX - Plataforma Global de Carga y Logística

Plataforma profesional de envíos internacionales, carga terrestre, aérea, marítima y panel de administración avanzado para operaciones logísticas en España y a nivel global.

## 🚀 Tecnologías

- **Framework**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS v4
- **Iconos & Animaciones**: Lucide React + Motion
- **Hosting recomendado**: Vercel

---

## 📦 Despliegue en Vercel (Guía Rápida)

### Opción 1: Conectar Repositorio de GitHub en Vercel (Recomendado)

1. **Inicializar Git y subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PortX Logistics Platform"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/portx-logistics.git
   git push -u origin main
   ```

2. **Importar en Vercel:**
   - Inicia sesión en [Vercel](https://vercel.com).
   - Haz clic en **"Add New..."** → **"Project"**.
   - Conecta tu cuenta de GitHub y selecciona el repositorio `portx-logistics`.
   - Vercel detectará automáticamente la configuración gracias al archivo `vercel.json`:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Haz clic en **Deploy**. ¡Listo en menos de 1 minuto!

---

### Opción 2: Despliegue directo con Vercel CLI

Si prefieres usar la terminal con el CLI oficial de Vercel:

```bash
# Instalar Vercel CLI globalmente si no lo tienes
npm i -g vercel

# Iniciar sesión y desplegar
vercel

# Para desplegar directamente a producción:
vercel --prod
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Probar la compilación localmente
npm run preview
```

---

## 🔐 Panel de Administración

- Ruta de acceso: Haz clic en el botón de candado / "Acceso Administración" en la cabecera o pie de página.
- Requiere autenticación mediante correo de oficial y contraseña autorizada.
