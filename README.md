# Elegancia - Tienda de Moda Femenina

Una aplicación de eCommerce moderna y elegante construida con Next.js, Supabase y diseño responsivo. Especializada en moda femenina con integración de WhatsApp para pedidos.

## 🌟 Características

- **Stack Moderno**: Next.js 14, TypeScript, Tailwind CSS
- **Base de Datos**: Supabase con autenticación integrada
- **Autenticación**: Email/contraseña + Google OAuth
- **Carrito Inteligente**: Persistencia local + sincronización con Supabase
- **Panel Admin**: Gestión completa de productos y pedidos
- **Integración WhatsApp**: Envío automático de pedidos via n8n
- **Diseño Responsivo**: Optimizado para móvil, tablet y desktop
- **Tema Dual**: Modo claro y oscuro
- **SEO Optimizado**: Metadata dinámica y estructura semántica

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- Una cuenta de Supabase
- (Opcional) n8n para integración WhatsApp

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd elegancia-ecommerce
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Completa las variables en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_supabase
   ADMIN_EMAIL=admin@tudominio.com
   N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/whatsapp-order
   ```

4. **Configurar Supabase**
   - Crea un nuevo proyecto en [Supabase](https://supabase.com)
   - Ejecuta el script SQL en `supabase/schema.sql` en el editor SQL
   - Configura Google OAuth en Authentication > Providers (opcional)

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

6. **Acceder a la aplicación**
   - Sitio web: `http://localhost:3000`
   - Panel admin: `http://localhost:3000/admin` (requiere usuario admin)

## 🏗️ Arquitectura

### Estructura de Carpetas

```
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── auth/              # Páginas de autenticación
│   ├── cart/              # Carrito de compras
│   ├── checkout/          # Proceso de compra
│   ├── product/           # Páginas de productos
│   ├── shop/              # Catálogo de productos
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── layout/           # Header, Footer
│   ├── product/          # Componentes de producto
│   ├── cart/             # Componentes del carrito
│   └── ui/               # Componentes UI base
├── context/              # Contextos de React
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y configuración
└── types/                # Definiciones de TypeScript
```

### Tecnologías Principales

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, diseño responsivo
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Estado**: React Context + localStorage
- **Automatización**: n8n webhook para WhatsApp

## 🛍️ Funcionalidades

### Para Clientes
- Navegación de productos con filtros y búsqueda
- Carrito persistente entre sesiones
- Proceso de checkout simplificado
- Envío automático de pedidos por WhatsApp
- Autenticación con email o Google
- Diseño responsive y elegante

### Para Administradores
- Dashboard con estadísticas clave
- Gestión CRUD completa de productos
- Visualización y gestión de pedidos
- Control de inventario y stock
- Activación/desactivación de productos

## 🎨 Diseño

### Tema Elegante y Femenino
- Paleta de colores: Rosa, dorado rosa, tonos suaves
- Tipografía: Inter (moderna y legible)
- Componentes redondeados con sombras suaves
- Animaciones sutiles y transiciones fluidas

### Responsive Design
- **Móvil**: Navegación optimizada, carrito accesible
- **Tablet**: Layout adaptativo, grillas flexibles  
- **Desktop**: Experiencia completa, múltiples columnas

## 🔧 Configuración Avanzada

### Supabase Setup

1. **Políticas de Seguridad (RLS)**
   - Los productos son visibles públicamente
   - Los usuarios solo ven sus propios pedidos
   - Solo administradores pueden gestionar productos

2. **Funciones Automáticas**
   - Creación automática de perfil al registrarse
   - Detección automática de administrador por email
   - Actualización de timestamps

### Integración WhatsApp

1. **Configurar n8n**
   - Crear workflow con webhook trigger
   - Conectar con WhatsApp Business API
   - Formatear mensaje de pedido

2. **Variables de Entorno**
   ```env
   N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/whatsapp
   ```

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conectar repositorio**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configurar variables de entorno**
   - Agrega todas las variables del `.env.example`
   - Configura dominios personalizados si es necesario

3. **Configuración automática**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## 📱 Uso

### Como Cliente
1. Explora productos en `/shop`
2. Agrega items al carrito
3. Procede al checkout en `/checkout`
4. Completa información de contacto
5. Recibe confirmación por WhatsApp

### Como Administrador
1. Inicia sesión con cuenta admin
2. Accede a `/admin`
3. Gestiona productos y pedidos
4. Monitorea estadísticas de ventas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

¿Necesitas ayuda? 

- 📧 Email: soporte@elegancia.com
- 💬 WhatsApp: +1234567890
- 📱 Telegram: @elegancia_soporte

---

Hecho con 💕 para mujeres elegantes