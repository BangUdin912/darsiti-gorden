"use client";

import type { Product } from "@/types/product";

interface Props {
  products: Product[];
  current: string;
  onSelect: (value: string) => void;
}

export default function CategoryFilter({
  products,
  current,
  onSelect,
}: Props) {
  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        products.flatMap((product) =>
          Array.isArray(product.category)
            ? product.category
            : [product.category]
        )
      )
    )
      .filter(Boolean)
      .sort(),
  ];

  return (
    <section className="sticky top-20 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const total =
              category === "Semua"
                ? products.length
                : products.filter((product) =>
                    Array.isArray(product.category)
                      ? product.category.includes(category)
                      : product.category === category
                  ).length;

            return (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  current === category
                    ? "border-stone-900 bg-stone-900 text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                <span>{category}</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    current === category
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {total}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}