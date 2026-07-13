"use client";

import type { GalleryItem } from "@/types/gallery";

interface Props {
  products: GalleryItem[];
  current: string;
  onSelect: (value: string) => void;
}

export default function GalleryFilter({
  products,
  current,
  onSelect,
}: Props) {
  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        products.flatMap((item) =>
          Array.isArray(item.category)
            ? item.category
            : [item.category]
        )
      )
    ).sort(),
  ];

  return (
    <section className="sticky top-20 z-30 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 py-6">

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">

          {categories.map((category) => {
            const total =
              category === "Semua"
                ? products.length
                : products.filter((item) =>
                    Array.isArray(item.category)
                      ? item.category.includes(category)
                      : item.category === category
                  ).length;

            return (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  current === category
                    ? "bg-stone-900 text-white shadow-lg"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                <span>{category}</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    current === category
                      ? "bg-white/20 text-white"
                      : "bg-stone-100 text-stone-600"
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