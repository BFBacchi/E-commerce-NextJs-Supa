# Boutique Rosa - E-Commerce con Next.js y Supabase

Una aplicación de comercio electrónico moderna y elegante construida con Next.js 14, Supabase, OnceUI y TypeScript.

## 🚀 Características

- 🛍️ Catálogo de productos con búsqueda y filtros por categoría
- 🛒 Carrito de compras con persistencia local y sincronización con Supabase
- 👤 Autenticación con email/contraseña y Google OAuth
- 👩‍💼 Panel de administración para gestión de productos e inventario
- 📱 Diseño responsive para móvil, tablet y desktop
- 🌙 Tema claro/oscuro
- 💬 Integración con WhatsApp para envío de pedidos
- 🎨 Diseño elegante y femenino con colores rosa y dorado

## 📋 Requisitos previos

- Node.js 18+ 
- Una cuenta de Supabase
- (Opcional) Una instancia de n8n para la integración con WhatsApp

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd ecommerce-nextjs-supabase
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp .env.example .env.local
```

4. Configura las variables de entorno en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
ADMIN_EMAIL=tu_email_de_admin@ejemplo.com
NEXT_PUBLIC_ADMIN_EMAIL=tu_email_de_admin@ejemplo.com
N8N_WEBHOOK_URL=tu_webhook_url_de_n8n (opcional)
```

## 🗄️ Configuración de Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)

2. Ejecuta el script SQL ubicado en `lib/supabase/schema.sql` en el editor SQL de Supabase

3. Configura la autenticación:
   - Habilita el proveedor Email/Password
   - (Opcional) Configura Google OAuth siguiendo la [documentación de Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google)

4. Actualiza las políticas RLS si es necesario (el script SQL ya incluye políticas básicas)

## 🚀 Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Estructura del proyecto

```
├── app/                  # Rutas de Next.js (App Router)
│   ├── admin/           # Panel de administración
│   ├── auth/            # Páginas de autenticación
│   ├── cart/            # Página del carrito
│   ├── checkout/        # Página de checkout
│   ├── product/         # Páginas de productos
│   └── shop/            # Catálogo de productos
├── components/          # Componentes reutilizables
├── context/            # Contextos de React (Auth, Cart, Theme)
├── lib/                # Utilidades y configuración
│   └── supabase/       # Cliente y esquema de Supabase
├── public/             # Archivos estáticos
└── types/              # Definiciones de TypeScript
```

## 🔐 Administración

El usuario configurado en `ADMIN_EMAIL` tiene acceso al panel de administración en `/admin` donde puede:

- Ver estadísticas del negocio
- Gestionar productos (crear, editar, eliminar)
- Ver órdenes recientes
- Monitorear inventario

## 📱 Integración con WhatsApp

La aplicación incluye integración con n8n para enviar pedidos por WhatsApp:

1. Configura un webhook en n8n
2. Añade la URL del webhook en `N8N_WEBHOOK_URL`
3. Los pedidos se enviarán automáticamente cuando se confirmen

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno en el panel de Vercel
3. Despliega con un clic

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

Hecho con ❤️ usando Next.js, Supabase y OnceUI