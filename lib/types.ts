export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  image: string;
  category?: string;
  inventory: number;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string | null;
  items: CartItem[];
  total: number; // cents
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: string;
};
