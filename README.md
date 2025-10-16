# Rose Boutique (Next.js + Supabase + OnceUI)

Proyecto de ejemplo eCommerce listo para Vercel.

1. Copia `.env.example` a `.env.local` y completa variables.
2. `npm install`
3. `npm run dev`

Tablas esperadas en Supabase:
- `products` (id TEXT PK, name TEXT, description TEXT, price INT, image TEXT, category TEXT, inventory INT, featured BOOL)
- `orders` (id UUID PK, userId TEXT, items JSON, total INT, status TEXT, createdAt TIMESTAMP)
