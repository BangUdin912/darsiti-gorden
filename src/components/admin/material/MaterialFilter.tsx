"use client";

import { Search, RotateCcw } from "lucide-react";

const categories = [
  "",
  "Blackout",
  "Lokal",
  "Vitrase",
  "Blind",
];

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  featured: boolean | null;
  onFeaturedChange: (value: boolean | null) => void;
}

export default function MaterialFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  featured,
  onFeaturedChange,
}: Props) {
  function resetFilter() {
    onSearchChange("");
    onCategoryChange("");
    onFeaturedChange(null);
  }

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari bahan..."
            className="w-full rounded-full border border-stone-300 py-3 pl-11 pr-4 outline-none transition focus:border-amber-500"
          />

        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-full border border-stone-300 px-5 py-3 outline-none transition focus:border-amber-500"
        >
          <option value="">Semua Kategori</option>

          {categories
            .filter(Boolean)
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>

        <div className="ml-auto flex gap-3">

          {/* Featured */}
          <select
            value={
              featured === null
                ? ""
                : featured
                ? "true"
                : "false"
            }
            onChange={(e) => {
              if (e.target.value === "") {
                onFeaturedChange(null);
              } else {
                onFeaturedChange(e.target.value === "true");
              }
            }}
            className="rounded-full border border-stone-300 px-5 py-3 outline-none transition focus:border-amber-500"
          >
            <option value="">Semua</option>
            <option value="true">Featured</option>
            <option value="false">Non Featured</option>
          </select>

          {/* Reset */}
          <button
            type="button"
            onClick={resetFilter}
            className="flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 transition hover:bg-stone-100"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}