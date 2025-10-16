# Configuración de Supabase

Este documento explica cómo configurar Supabase para tu aplicación de eCommerce.

## Paso 1: Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Guarda la URL del proyecto y la clave anónima (anon key)

## Paso 2: Ejecutar el schema SQL

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Copia todo el contenido del archivo `lib/supabase/schema.sql`
3. Pégalo en el editor SQL
4. Ejecuta el script

Esto creará:
- Tabla `products` con productos de ejemplo
- Tabla `orders` para las órdenes
- Tabla `order_items` para los items de las órdenes
- Tabla `cart_items` para carritos persistentes
- Políticas de seguridad (Row Level Security)

## Paso 3: Configurar autenticación

### Email/Password
Ya está habilitado por defecto en Supabase.

### Google OAuth

1. En el dashboard de Supabase, ve a **Authentication > Providers**
2. Habilita **Google**
3. Sigue las instrucciones para configurar OAuth con Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API de Google+
   - Ve a **Credenciales** y crea credenciales OAuth 2.0
   - Añade las URIs de redirección autorizadas:
     - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (para desarrollo)
   - Copia el Client ID y Client Secret
4. Pega las credenciales en Supabase
5. Guarda los cambios

## Paso 4: Configurar variables de entorno

1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Rellena las variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
   ADMIN_EMAIL=tu-email-admin@ejemplo.com
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/order
   ```

## Paso 5: Configurar el email de administrador

El usuario administrador se identifica por su email. Asegúrate de:

1. Configurar `ADMIN_EMAIL` en `.env.local` con tu email
2. Crear una cuenta en la aplicación con ese mismo email
3. Una vez autenticado, tendrás acceso al dashboard `/admin`

## Paso 6: Configurar n8n (opcional)

Si quieres usar la integración de WhatsApp:

1. Configura una instancia de n8n
2. Crea un workflow con un webhook que:
   - Reciba datos del pedido
   - Los formatee
   - Los envíe a WhatsApp usando la API de WhatsApp Business
3. Copia la URL del webhook a `NEXT_PUBLIC_N8N_WEBHOOK_URL` en tu `.env.local`
   
   **Nota**: Esta variable debe ser pública (NEXT_PUBLIC_) porque se usa desde el cliente para enviar los datos del pedido.

Si no configuras n8n, la aplicación funcionará normalmente pero sin enviar notificaciones a WhatsApp.

## Notas de Seguridad

- Nunca subas tu archivo `.env.local` a Git
- Las políticas RLS están configuradas para proteger los datos
- Solo el administrador puede crear/editar/eliminar productos
- Los usuarios solo pueden ver sus propias órdenes
- Todos pueden ver productos y crear órdenes
