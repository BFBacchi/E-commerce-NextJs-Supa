# 🛍️ Boutique - E-commerce Next.js + Supabase

Una aplicación de e-commerce moderna y elegante construida con Next.js, Supabase, y un diseño femenino sofisticado.

## ✨ Características

### 🎨 Diseño y UX
- **Tema elegante y femenino** con colores rosa, dorado y tonos suaves
- **Modo oscuro/claro** integrado con OnceUI
- **Diseño responsive** para desktop, tablet y móvil
- **Animaciones suaves** y transiciones elegantes
- **Iconografía moderna** con Lucide React

### 🛒 Funcionalidades de E-commerce
- **Catálogo de productos** con filtros y búsqueda
- **Carrito de compras** persistente con localStorage
- **Página de detalles** de producto con galería de imágenes
- **Proceso de checkout** completo
- **Integración con WhatsApp** para confirmación de pedidos

### 👤 Autenticación y Usuarios
- **Autenticación con Supabase** (email/password + Google OAuth)
- **Sistema de roles** (usuario/admin)
- **Panel de administración** exclusivo para admins
- **Gestión de sesiones** automática

### 🛠️ Panel de Administración
- **Gestión de productos** (CRUD completo)
- **Gestión de pedidos** con actualización de estados
- **Dashboard** con estadísticas de ventas
- **Control de inventario** en tiempo real

### 🔧 Tecnologías

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS con tema personalizado
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Estado**: React Context + Custom Hooks
- **UI Components**: Componentes personalizados con OnceUI
- **Deployment**: Vercel (listo para producción)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd boutique-ecommerce
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia `.env.example` a `.env.local` y configura:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Configuration
ADMIN_EMAIL=admin@example.com

# N8N Webhook for WhatsApp Integration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/whatsapp

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### 4. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script SQL en `supabase/schema.sql` en el SQL Editor
3. Configura la autenticación con Google OAuth (opcional)
4. Configura el email del admin en la variable `ADMIN_EMAIL`

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
boutique-ecommerce/
├── app/                    # Next.js App Router
│   ├── admin/             # Panel de administración
│   ├── auth/              # Página de autenticación
│   ├── cart/              # Página del carrito
│   ├── checkout/          # Proceso de pago
│   ├── order-confirmation/ # Confirmación de pedido
│   ├── product/[id]/      # Detalles del producto
│   ├── shop/              # Catálogo de productos
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Button, Input, Card)
│   ├── Header.tsx        # Navegación principal
│   ├── Footer.tsx        # Pie de página
│   ├── ProductCard.tsx   # Tarjeta de producto
│   └── CartItem.tsx      # Item del carrito
├── context/              # Contextos de React
│   ├── AuthContext.tsx   # Estado de autenticación
│   ├── CartContext.tsx   # Estado del carrito
│   └── ThemeContext.tsx  # Estado del tema
├── lib/                  # Utilidades y configuración
│   ├── supabase.ts       # Cliente de Supabase
│   ├── types.ts          # Tipos TypeScript
│   ├── utils.ts          # Funciones utilitarias
│   └── whatsapp.ts       # Integración con WhatsApp
└── supabase/             # Esquemas de base de datos
    └── schema.sql        # Script SQL inicial
```

## 🎨 Personalización del Tema

El tema está configurado en `tailwind.config.js` con colores personalizados:

- **Rosa**: `#ec4899` (primary)
- **Rose**: `#f43f5e` (secondary)  
- **Dorado**: `#f59e0b` (accent)
- **Sombras suaves**: `shadow-soft`, `shadow-rose`

## 🔗 Integración con WhatsApp

La aplicación incluye integración con n8n para enviar pedidos por WhatsApp:

1. Configura un webhook de n8n
2. Añade la URL en `N8N_WEBHOOK_URL`
3. Los pedidos se enviarán automáticamente con detalles del cliente y productos

## 📱 Funcionalidades Móviles

- **Navegación responsive** con menú hamburguesa
- **Carrito optimizado** para móviles
- **Checkout adaptativo** con formularios táctiles
- **Imágenes optimizadas** con Next.js Image

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otras plataformas

La aplicación es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔒 Seguridad

- **Row Level Security (RLS)** en Supabase
- **Autenticación segura** con JWT
- **Validación de formularios** en frontend y backend
- **Protección de rutas** de administración

## 📊 Monitoreo y Analytics

- **Logs de errores** en consola
- **Métricas de rendimiento** con Next.js
- **Estadísticas de pedidos** en panel admin

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: info@boutique.com
- 💬 WhatsApp: +34 123 456 789
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/boutique-ecommerce/issues)

---

Hecho con ❤️ para pequeñas tiendas virtuales