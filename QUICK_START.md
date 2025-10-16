# 🚀 Inicio Rápido - 5 Minutos

Esta guía te ayudará a tener la aplicación funcionando en menos de 5 minutos.

## 1️⃣ Instalar Dependencias (30 segundos)

```bash
npm install
```

## 2️⃣ Configurar Supabase (2 minutos)

### Opción A: Usar Supabase Cloud (Recomendado)

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. Ve al **SQL Editor** y ejecuta el script de `lib/supabase/schema.sql`
3. Copia tu URL y ANON KEY

### Opción B: Desarrollo Sin Base de Datos

Puedes explorar la UI sin configurar Supabase, pero no podrás ver productos reales.

## 3️⃣ Configurar Variables de Entorno (1 minuto)

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
# Mínimo para desarrollo local (sin autenticación)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima

# Para ser administrador
ADMIN_EMAIL=tu@email.com

# Opcional: Para WhatsApp
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-webhook.com
```

## 4️⃣ Ejecutar en Desarrollo (10 segundos)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✅ Verificación

Deberías ver:
- ✅ Página de inicio con diseño rosa elegante
- ✅ Barra de navegación con carrito
- ✅ Toggle de tema claro/oscuro
- ✅ Si configuraste Supabase: productos de ejemplo

## 🔧 Configuración Completa (Opcional)

### Habilitar Autenticación

1. En Supabase, ve a **Authentication > Providers**
2. Email/Password ya está habilitado
3. Para Google OAuth:
   - Sigue los pasos en [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### Ser Administrador

1. Configura `ADMIN_EMAIL` en `.env.local` con tu email
2. Crea una cuenta en la app con ese email
3. Accede a `/admin`

### Habilitar WhatsApp

1. Configura n8n (ver [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
2. Añade `NEXT_PUBLIC_N8N_WEBHOOK_URL` a `.env.local`

## 🎨 Explorar la Aplicación

### Como Usuario:
1. Ve a `/shop` → Ver todos los productos
2. Haz clic en un producto → Ver detalles
3. Añade al carrito → Ver carrito persistente
4. Checkout → Simular compra

### Como Administrador (requiere configuración):
1. Inicia sesión con tu cuenta admin
2. Ve a `/admin`
3. Crea/edita/elimina productos
4. Ve órdenes de clientes

## 📚 Documentación Completa

- [README.md](./README.md) - Documentación completa
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Configuración detallada de Supabase
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de despliegue a Vercel

## 🆘 Problemas Comunes

### "Cannot read properties of undefined"
→ Configura las variables de entorno en `.env.local`

### "Products are viewable by everyone policy failed"
→ Ejecuta el schema SQL en Supabase

### El carrito no guarda items
→ Verifica que localStorage esté habilitado en tu navegador

### No puedo acceder a `/admin`
→ Asegúrate de que `ADMIN_EMAIL` coincida con tu cuenta

## 🌟 Próximos Pasos

1. Personaliza los colores en `tailwind.config.ts`
2. Añade tus propios productos en el admin
3. Configura tu dominio personalizado
4. ¡Despliega a producción!

---

¿Dudas? Abre un issue en GitHub o revisa la documentación completa.
