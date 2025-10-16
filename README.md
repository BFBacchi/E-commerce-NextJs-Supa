# 🌸 Boutique Rosa - Aplicación eCommerce

Una aplicación moderna de eCommerce construida con Next.js, Supabase, y diseño elegante con tema rosa.

## ✨ Características

- 🛍️ **Catálogo de productos** con búsqueda y filtros por categoría
- 🛒 **Carrito de compras** persistente con localStorage
- 👤 **Autenticación** con email/password y Google OAuth
- 👩‍💼 **Panel de administración** para gestionar productos y órdenes
- 📱 **Integración con WhatsApp** vía n8n para notificaciones
- 🌓 **Modo claro/oscuro** con toggle de tema
- 📱 **Diseño responsive** para desktop, tablet y móvil
- 💅 **UI elegante** con estética femenina (rosa, oro rosa)

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de datos & Auth**: Supabase
- **Estilos**: Tailwind CSS + OnceUI
- **State Management**: Zustand
- **Deploy**: Vercel-ready

## 🚀 Inicio Rápido

¿Con prisa? Ve a [QUICK_START.md](./QUICK_START.md) para empezar en 5 minutos.

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

Sigue las instrucciones en [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
ADMIN_EMAIL=tu-email-admin@ejemplo.com
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/order
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
├── app/                    # Rutas de Next.js (App Router)
│   ├── admin/             # Dashboard de administración
│   ├── auth/              # Páginas de autenticación
│   ├── cart/              # Carrito de compras
│   ├── checkout/          # Proceso de checkout
│   ├── product/[id]/      # Detalle de producto
│   ├── shop/              # Catálogo de productos
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   └── ui/               # Componentes UI reutilizables
├── lib/                   # Utilidades y lógica de negocio
│   ├── api/              # Funciones de API
│   ├── store/            # Stores de Zustand
│   └── supabase/         # Configuración de Supabase
├── public/               # Archivos estáticos
└── ...                   # Archivos de configuración
```

## 👩‍💼 Panel de Administración

Para acceder al panel de administración:

1. Configura `ADMIN_EMAIL` en `.env.local`
2. Crea una cuenta con ese email
3. Inicia sesión
4. Accede a `/admin`

Desde el panel puedes:
- ✏️ Crear, editar y eliminar productos
- 📦 Ver todas las órdenes
- 📊 Gestionar inventario

## 🔐 Autenticación

La aplicación soporta dos métodos de autenticación:

### Email/Password
Registro e inicio de sesión tradicional con validación.

### Google OAuth
Inicio de sesión rápido con cuenta de Google.

## 🛒 Flujo de Compra

1. **Explorar productos** en la página principal o tienda
2. **Añadir al carrito** productos deseados
3. **Revisar carrito** y ajustar cantidades
4. **Checkout** con información de contacto
5. **Confirmación** y notificación vía WhatsApp

## 📱 Integración con WhatsApp

La aplicación puede enviar detalles de pedidos a WhatsApp usando n8n:

1. Configura una instancia de n8n
2. Crea un workflow que reciba datos del webhook
3. Conecta con WhatsApp Business API
4. Configura `N8N_WEBHOOK_URL` en `.env.local`

El payload enviado incluye:
```json
{
  "email": "cliente@email.com",
  "name": "Nombre del Cliente",
  "phone": "+52 55 1234 5678",
  "items": [
    {
      "name": "Producto",
      "price": 99.99,
      "quantity": 2,
      "subtotal": 199.98
    }
  ],
  "total": 199.98,
  "timestamp": "2025-10-16T12:00:00.000Z"
}
```

## 🎨 Personalización del Tema

El tema se puede personalizar en `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#fdf2f8',   // Rosa muy claro
    100: '#fce7f3',  // Rosa claro
    // ... más tonos
  },
  rosegold: '#b76e79', // Oro rosa
}
```

## 🚀 Desplegar a Vercel

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático

## 📝 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase | ✅ |
| `ADMIN_EMAIL` | Email del usuario administrador | ✅ |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | URL del webhook de n8n para WhatsApp | ⚠️ Opcional |

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles

## 🌟 Características Futuras

- [ ] Pasarela de pago integrada (Stripe/PayPal)
- [ ] Sistema de reseñas y calificaciones
- [ ] Wishlist/Lista de deseos
- [ ] Cupones de descuento
- [ ] Notificaciones por email
- [ ] Panel de analytics para admin
- [ ] Envío y tracking de paquetes
- [ ] Múltiples imágenes por producto
- [ ] Variantes de producto (tallas, colores)

---

Hecho con 💖 usando Next.js y Supabase
