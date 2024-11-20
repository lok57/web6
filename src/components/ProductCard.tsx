import { useState } from 'react';
import { Heart, Edit2, Save, X, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onUpdate?: (product: Product) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({
  product,
  isAdmin,
  onUpdate,
  onDelete,
  onQuickView
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isHovered, setIsHovered] = useState(false);

  // Safely get the main image URL with fallbacks
  const getMainImage = () => {
    if (product.media && product.media.length > 0) {
      return product.media[0].url;
    }
    if (product.image) {
      return product.image;
    }
    return '/placeholder.jpg';
  };

  const mainImage = getMainImage();

  const handleSave = async () => {
    if (!onUpdate) return;

    try {
      await onUpdate(editedProduct);
      setIsEditing(false);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await onDelete(product.id);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300"
      onMouseEnter={() => !isAdmin && setIsHovered(true)}
      onMouseLeave={() => !isAdmin && setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {isAdmin && (
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-accent-600 text-white rounded-full hover:bg-accent-700 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {!isAdmin && isHovered && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <div className="space-y-3">
              <button
                onClick={() => onQuickView?.(product)}
                className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Quick View</span>
              </button>
              <button
                className="flex items-center justify-center space-x-2 bg-accent-600 text-white px-6 py-2 rounded-full hover:bg-accent-700 transition-colors w-full"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}