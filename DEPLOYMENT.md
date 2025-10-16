# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar tu aplicación de eCommerce en Vercel.

## Pre-requisitos

- Una cuenta de GitHub
- Una cuenta de Vercel
- Un proyecto de Supabase configurado (ver [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

## Paso 1: Preparar el Repositorio

1. Asegúrate de que tu código esté en un repositorio de GitHub
2. Verifica que el archivo `.env.local` esté en `.gitignore` (ya lo está)
3. Haz push de tu código:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en "New Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

## Paso 3: Configurar Variables de Entorno

En la sección de configuración de Vercel, añade las siguientes variables de entorno:

### Variables Requeridas

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
ADMIN_EMAIL=tu-email-admin@ejemplo.com
```

### Variables Opcionales

```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/order
```

**Importante**: 
- Copia los valores exactos desde tu archivo `.env.local`
- No incluyas espacios ni comillas extras
- Las variables con `NEXT_PUBLIC_` son accesibles desde el cliente

## Paso 4: Deploy

1. Haz clic en "Deploy"
2. Vercel construirá y desplegará tu aplicación automáticamente
3. El proceso toma aproximadamente 2-3 minutos

## Paso 5: Configurar el Callback de Supabase

Una vez desplegada, actualiza la configuración de Supabase:

1. Ve a tu dashboard de Supabase
2. Ve a **Authentication > URL Configuration**
3. Añade tu URL de Vercel a:
   - **Site URL**: `https://tu-app.vercel.app`
   - **Redirect URLs**: 
     - `https://tu-app.vercel.app/auth/callback`
     - `https://tu-app.vercel.app/**` (para permitir todos los subdominios)

4. Si usas Google OAuth, actualiza también en Google Cloud Console:
   - Añade `https://tu-app.vercel.app/auth/callback` a URIs de redirección autorizadas

## Paso 6: Verificar el Despliegue

1. Visita tu URL de Vercel
2. Prueba las siguientes funcionalidades:
   - ✅ Navegar por productos
   - ✅ Añadir productos al carrito
   - ✅ Registro e inicio de sesión
   - ✅ Proceso de checkout
   - ✅ Panel de administración (con cuenta admin)

## Dominios Personalizados

Para usar tu propio dominio:

1. En Vercel, ve a **Settings > Domains**
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar DNS
4. Actualiza las URLs en Supabase y Google OAuth

## Actualizaciones Automáticas

Vercel desplegará automáticamente cuando:
- Hagas push a la rama `main`
- Crees un pull request (despliega preview)
- Fusiones un pull request

## Monitoreo y Logs

- **Analytics**: Ve a la pestaña Analytics en Vercel
- **Logs**: Ve a la pestaña Deployments y haz clic en cualquier despliegue
- **Errores**: Vercel muestra errores en tiempo real

## Solución de Problemas

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"

- Verifica que las variables de entorno estén configuradas correctamente
- Re-despliega después de añadir las variables

### Error de autenticación con Google

- Verifica que la URL de callback esté configurada en Google Cloud Console
- Asegúrate de que el Client ID y Secret sean correctos en Supabase

### Los productos no cargan

- Verifica que hayas ejecutado el schema SQL en Supabase
- Revisa los logs de Vercel para más detalles

### El carrito no persiste

- Esto es normal en modo incógnito o con cookies deshabilitadas
- El carrito usa localStorage, que debe estar habilitado

## Recomendaciones de Seguridad

✅ **Hacer**:
- Usar variables de entorno para todas las credenciales
- Habilitar Row Level Security en Supabase
- Mantener actualizadas las dependencias

❌ **Evitar**:
- Hardcodear credenciales en el código
- Subir archivos `.env` a Git
- Compartir claves API públicamente

## Despliegue Avanzado

### Preview Deployments

Cada pull request crea un despliegue de preview:
- URL única temporal
- Ideal para probar cambios
- Se elimina al cerrar el PR

### Edge Functions

Si quieres usar edge functions para n8n:

1. Crea un archivo en `app/api/webhook/route.ts`
2. Implementa la lógica del webhook allí
3. Usa esta URL en lugar de n8n directo

### Escalabilidad

La aplicación escala automáticamente con Vercel:
- CDN global
- Edge caching
- Optimización de imágenes
- Compresión automática

## Costo

- **Vercel Hobby**: Gratis para proyectos personales
- **Supabase Free**: Incluye 500MB de base de datos
- **Vercel Pro**: $20/mes para proyectos comerciales

---

¿Problemas con el despliegue? Revisa la [documentación oficial de Vercel](https://vercel.com/docs) o abre un issue en GitHub.
