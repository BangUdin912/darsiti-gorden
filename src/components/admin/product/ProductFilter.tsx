"use client";

import { RefreshCcw } from "lucide-react";

const categories = ["Blackout", "Lokal", "Vitrase", "Blind"];

interface ProductFilterProps {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  featured: boolean | null;
  setFeatured: (value: boolean | null) => void;
}

export default function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
  featured,
  setFeatured,
}: ProductFilterProps) {
  function resetFilter() {
    setSearch("");
    setCategory("");
    setFeatured(null);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 md:flex-row md:items-center md:justify-between">

      {/* LEFT: SEARCH + CATEGORY */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 md:w-64"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 md:w-48"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* RIGHT: FEATURED + RESET */}
      <div className="flex items-center gap-3">

        {/* FEATURED FILTER */}
        <select
          value={featured === null ? "all" : featured ? "yes" : "no"}
          onChange={(e) => {
            const val = e.target.value;

            if (val === "all") setFeatured(null);
            else if (val === "yes") setFeatured(true);
            else setFeatured(false);
          }}
          className="rounded-xl border px-4 py-2"
        >
          <option value="all">Semua</option>
          <option value="yes">Featured</option>
          <option value="no">Non-Featured</option>
        </select>

        {/* RESET */}
        <button
          onClick={resetFilter}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-stone-100"
        >
          <RefreshCcw size={14} />
          Reset
        </button>

      </div>

    </div>
  );
}