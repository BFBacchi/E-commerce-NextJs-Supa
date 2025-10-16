import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { CartSyncClient } from '@/components/CartSyncClient';

export const metadata: Metadata = {
  title: 'Rose Boutique',
  description: 'Ecommerce elegante con Next.js y Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background text-foreground antialiased')}>        
        <Providers>
          <Navbar />
          <CartSyncClient />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
