export interface Price {
  currency: string;
  amount: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export interface ProductsResponse {
  products: ProductCollection[];
}

export interface ProductDetailResponse {
  product: ProductCollection;
}

export interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: Price;
}

export interface CartContextProps {
  cart: ProductCartProps[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  isBagOpen: boolean;
  setIsBagOpen: (isOpen: boolean) => void;
}

export interface ProductCartProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface ProductCollection {
  collection_id: string | null;
  created_at: string;
  description: string;
  discountable: boolean;
  handle: string;
  height: number | null;
  hs_code: string | null;
  id: string;
  images: Image[];
  is_giftcard: boolean;
  length: number | null;
  material: string | null;
  mid_code: string | null;
  options: ProductOption[];
  origin_country: string | null;
  subtitle: string | null;
  tags: string[];
  thumbnail: string;
  title: string;
  type: string | null;
  type_id: string | null;
  updated_at: string;
  variants: Variant[];
  weight: string | null;
  width: number | null;
}

interface Image {
  url?: string;
  id?: string;
}

interface ProductOption {
  id?: string;
  value?: string;
}

export interface Variant {
  allow_backorder: boolean;
  barcode: string | null;
  created_at: string;
  deleted_at: string | null;
  ean: string | null;
  height: number | null;
  hs_code: string | null;
  id: string;
  length: number | null;
  manage_inventory: boolean;
  material: string | null;
  mid_code: string | null;
  options: VariantOption[];
  origin_country: string | null;
  product_id: string;
  sku: string;
  title: string;
  upc: string | null;
  updated_at: string;
  variant_rank: number;
  weight: number | null;
  width: number | null;
}

interface VariantOption {
  id?: string;
  value?: string;
}
