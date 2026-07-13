"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface Props {
  currentProduct: Product;
  products: Product[];
  onOpen: (product: Product) => void;
}

export default function RelatedProduct({
  currentProduct,
  products,
  onOpen,
}: Props) {
  const related = products
    .filter((item) => item.id !== currentProduct.id)
    .filter((item) =>
      item.category.some((cat) =>
        currentProduct.category.includes(cat)
      )
    )
    .slice(0, 4);

  const fallback =
    related.length > 0
      ? related
      : products
          .filter((item) => item.id !== currentProduct.id)
          .slice(0, 4);

  if (fallback.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">

      {/* Heading */}

      <div className="mb-10">

        <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
          Rekomendasi
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          Produk Terkait
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Produk lain yang mungkin cocok dengan kebutuhan Anda.
        </p>

      </div>

      {/* Grid */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {fallback.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={() => onOpen(product)}
          />
        ))}

      </div>

    </section>
  );
}