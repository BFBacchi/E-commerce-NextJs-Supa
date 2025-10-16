import Image from 'next/image';
import { getProductById } from '@/lib/data';
import { AddToCartButton } from '@/components/AddToCartButton';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  return {
    title: product ? `${product.name} | Rose Boutique` : 'Producto',
    description: product?.description ?? 'Detalle de producto',
    openGraph: product ? {
      title: product.name,
      description: product.description,
      images: [product.image]
    } : undefined
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return <div>Producto no encontrado</div>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden card">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-rose-700 dark:text-rose-200">{product.name}</h1>
        <p className="text-rose-600/80 dark:text-rose-300/80">{product.description}</p>
        <div className="text-2xl font-bold text-rose-700 dark:text-rose-100">${(product.price/100).toFixed(2)}</div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
