// lib/products.ts
import { Product } from './types';
import { DEFAULT_PRODUCTS } from './constants';

// Fetch products from our new API route
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    const dbProducts = data.products || [];
    
    // Merge leaflet definitions from local DEFAULT_PRODUCTS based on ID/Name mapping
    return dbProducts.map((p: any) => {
      const local = DEFAULT_PRODUCTS.find((lp) => lp.id === p.id || lp.name_uz.toLowerCase() === p.name_uz.toLowerCase());
      if (local) {
        return {
          ...p,
          leaflet_uz: local.leaflet_uz,
          leaflet_ru: local.leaflet_ru,
        };
      }
      return p;
    });
  } catch (error) {
    console.error('Error fetching products, falling back to local data:', error);
    return DEFAULT_PRODUCTS;
  }
}

