"use client";

import { useEffect, useState } from "react";

import { productService } from "@/lib/productService";
import type { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await productService.getAll();

      setProducts(
        data.filter((item) => item.is_active)
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
  };
}