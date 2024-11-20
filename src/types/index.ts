export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory?: string;
    media: ProductMedia[];
    inStock?: boolean;
    createdAt: string;
    updatedAt: string;
    sizes?: string[];
    image: string; // Ensure every product has an image
}

export interface ProductMedia {
    url: string;
    type: 'image' | 'video';
}

export interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    size?: string;
    inStock?: boolean;
    createdAt: string;
    updatedAt: string;
    sizes?: string[];
}

export interface ToastProps {
    show: boolean;
    message: string;
    onClose: () => void;
    duration?: number;
}

export interface MediaFile {
    id: string;
    type: 'image' | 'video';
    file: File;
    preview: string;
}

export interface UserProfile {
    id: string;
    name?: string;
    email: string;
    phone?: string;
    photoURL?: string;
    createdAt: string;
    updatedAt: string;
}
