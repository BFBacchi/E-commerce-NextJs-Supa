-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create cart_items table for persistent cart
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Products policies (read for all, write for admin only)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are insertable by admin" ON products
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = current_setting('app.admin_email'));

CREATE POLICY "Products are updatable by admin" ON products
  FOR UPDATE USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));

CREATE POLICY "Products are deletable by admin" ON products
  FOR DELETE USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));

-- Orders policies (users can view their own orders, admin can view all)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = current_setting('app.admin_email'));

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can view own cart items" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
  ('Rose Gold Necklace', 'Elegant rose gold necklace with delicate chain', 89.99, 'https://via.placeholder.com/400x400/ffc0cb/fff?text=Necklace', 'jewelry', 15),
  ('Silk Scarf', 'Luxurious silk scarf in soft pink tones', 59.99, 'https://via.placeholder.com/400x400/ffb6c1/fff?text=Scarf', 'accessories', 25),
  ('Pearl Earrings', 'Classic pearl earrings with gold accents', 124.99, 'https://via.placeholder.com/400x400/ffd1dc/fff?text=Earrings', 'jewelry', 10),
  ('Leather Handbag', 'Premium leather handbag in blush pink', 199.99, 'https://via.placeholder.com/400x400/ffb6c1/fff?text=Handbag', 'bags', 8),
  ('Cashmere Sweater', 'Soft cashmere sweater in rose color', 149.99, 'https://via.placeholder.com/400x400/ffc0cb/fff?text=Sweater', 'clothing', 20),
  ('Crystal Bracelet', 'Sparkling crystal bracelet with adjustable chain', 79.99, 'https://via.placeholder.com/400x400/ffd1dc/fff?text=Bracelet', 'jewelry', 30);