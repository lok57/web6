import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  description: string;
  products: Product[];
  heroImage?: string;
  isAdmin?: boolean;
  onUpdateProduct?: (product: Product) => Promise<void>;
  onDeleteProduct?: (id: string) => Promise<void>;
  onQuickView?: (product: Product) => void;
}

export default function ProductGrid({
  title,
  description,
  heroImage,
  products,
  isAdmin,
  onUpdateProduct,
  onDeleteProduct,
  onQuickView
}: ProductGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/80">{description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onUpdate={onUpdateProduct}
            onDelete={onDeleteProduct}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}