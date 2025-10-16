-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de items de órdenes
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de carritos persistentes (opcional, para usuarios autenticados)
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);

-- Políticas de seguridad (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Todos pueden leer productos
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Solo admins pueden insertar/actualizar/eliminar productos
CREATE POLICY "Products can be managed by admins" ON products
  FOR ALL USING (
    auth.jwt()->>'email' = current_setting('app.admin_email', true)
  );

-- Usuarios pueden ver sus propias órdenes
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt()->>'email' = current_setting('app.admin_email', true));

-- Cualquiera puede crear órdenes
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Usuarios pueden ver items de sus propias órdenes
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR auth.jwt()->>'email' = current_setting('app.admin_email', true))
    )
  );

-- Cualquiera puede crear items de órdenes
CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Usuarios pueden gestionar su propio carrito
CREATE POLICY "Users can manage their own cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar timestamps
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
  ('Vestido Rosa Elegante', 'Hermoso vestido en tono rosa pastel, perfecto para ocasiones especiales', 89.99, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', 'vestidos', 15),
  ('Blusa de Seda', 'Blusa de seda con detalles de encaje, disponible en varios colores', 59.99, 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500', 'blusas', 20),
  ('Falda Plisada', 'Falda midi plisada en tono nude con cintura alta', 49.99, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500', 'faldas', 12),
  ('Conjunto Rosa Gold', 'Conjunto de dos piezas con detalles en oro rosa', 129.99, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500', 'conjuntos', 8),
  ('Vestido Floral', 'Vestido midi con estampado floral y mangas acampanadas', 74.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', 'vestidos', 18),
  ('Pantalón Palazzo', 'Pantalón de pierna ancha en tono rosa empolvado', 64.99, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500', 'pantalones', 10),
  ('Top Crop Rosa', 'Top corto con diseño moderno y cómodo', 34.99, 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500', 'tops', 25),
  ('Blazer Elegante', 'Blazer oversize en tono beige con botones dorados', 99.99, 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500', 'blazers', 14)
ON CONFLICT DO NOTHING;
