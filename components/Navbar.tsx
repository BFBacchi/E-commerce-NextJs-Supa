"use client";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useCartStore } from '@/context/cartStore';

export function Navbar() {
  const itemsCount = useCartStore((s) => s.totalItems);
  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur border-b border-rose-100 dark:border-rose-900/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-rose-700 dark:text-rose-200">Rose Boutique</Link>
        <nav className="flex items-center gap-4">
          <Link href="/shop" className="hover:underline">Tienda</Link>
          <Link href="/cart" className="hover:underline">Carrito ({itemsCount})</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
