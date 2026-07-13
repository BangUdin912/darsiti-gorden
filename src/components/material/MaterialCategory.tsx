"use client";

import type { MaterialCategory } from "@/types/material";

const categories: {
  label: string;
  value: MaterialCategory | "";
}[] = [
  {
    label: "Semua",
    value: "",
  },
  {
    label: "Blackout",
    value: "Blackout",
  },
  {
    label: "Lokal",
    value: "Lokal",
  },
  {
    label: "Vitrase",
    value: "Vitrase",
  },
  {
    label: "Blind",
    value: "Blind",
  },
];

interface MaterialCategoryProps {
  value: MaterialCategory | "";
  onChange: (value: MaterialCategory | "") => void;
}

export default function MaterialCategory({
  value,
  onChange,
}: MaterialCategoryProps) {
  return (
    <section className="sticky top-20 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">

      <div className="container mx-auto max-w-7xl px-4 py-6">

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">

          {categories.map((item) => (
            <button
              key={item.value || "all"}
              type="button"
              onClick={() => onChange(item.value)}
              className={`flex shrink-0 items-center rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                value === item.value
                  ? "border-stone-900 bg-stone-900 text-white shadow-lg"
                  : "border-stone-200 bg-white text-stone-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}