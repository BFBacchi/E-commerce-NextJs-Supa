-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  items JSONB NOT NULL,
  shipping_info JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías por defecto
INSERT INTO categories (name, slug, description) VALUES
('Vestidos', 'vestidos', 'Vestidos elegantes para toda ocasión'),
('Joyería', 'joyeria', 'Collares, pendientes y accesorios de joyería'),
('Accesorios', 'accesorios', 'Bolsos, cinturones y complementos'),
('Blusas', 'blusas', 'Blusas y camisas de mujer'),
('Faldas', 'faldas', 'Faldas de diferentes estilos y longitudes')
ON CONFLICT (slug) DO NOTHING;

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('Vestido Elegante Rosa', 'Vestido de fiesta en tono rosa con detalles dorados y corte perfecto para ocasiones especiales', 89.99, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center', 'vestidos', 5),
('Collar de Perlas', 'Collar elegante con perlas naturales y detalle dorado, perfecto para complementar cualquier outfit', 45.99, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center', 'joyeria', 8),
('Bolso de Cuero Rosa', 'Bolso de mano en cuero rosa con cierre dorado, ideal para el día a día', 125.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 'accesorios', 3),
('Blusa Seda Blanca', 'Blusa de seda blanca con detalles florales, perfecta para el verano', 65.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'blusas', 7),
('Pendientes de Oro', 'Pendientes elegantes en oro rosa con diseño minimalista', 35.99, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center', 'joyeria', 12),
('Falda Plisada Rosa', 'Falda plisada en tono rosa pastel, ideal para crear looks femeninos', 55.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'faldas', 4),
('Vestido Negro Clásico', 'Vestido negro elegante perfecto para eventos formales', 95.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'vestidos', 6),
('Pulsera de Plata', 'Pulsera delicada en plata con diseño minimalista', 28.99, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center', 'joyeria', 15),
('Cinturón de Cuero', 'Cinturón de cuero marrón con hebilla dorada', 42.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 'accesorios', 9),
('Camisa Blanca', 'Camisa blanca de algodón con corte clásico', 49.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'blusas', 11);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para productos (todos pueden leer)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- Solo admins pueden modificar productos
CREATE POLICY "Only admins can modify products" ON products
    FOR ALL USING (
        auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    );

-- Los usuarios pueden ver sus propios pedidos
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

-- Solo admins pueden ver todos los pedidos
CREATE POLICY "Admins can view all orders" ON orders
    FOR ALL USING (
        auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    );

-- Políticas para categorías (todos pueden leer)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Solo admins pueden modificar categorías
CREATE POLICY "Only admins can modify categories" ON categories
    FOR ALL USING (
        auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    );