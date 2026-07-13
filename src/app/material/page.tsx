"use client";

import { useEffect, useMemo, useState } from "react";

import MaterialHero from "@/components/material/MaterialHero";
import MaterialSearch from "@/components/material/MaterialSearch";
import MaterialCategory from "@/components/material/MaterialCategory";
import MaterialGrid from "@/components/material/MaterialGrid";

import { materialService } from "@/lib/materialService";

import type {
  Material,
  MaterialCategory as MaterialCategoryType,
} from "@/types/material";

export default function MaterialPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // kosong ("") = Semua
  const [category, setCategory] =
    useState<MaterialCategoryType | "">("");

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
    try {
      setLoading(true);

      const data = await materialService.getActive();

      setMaterials(data);
    } catch (error) {
      console.error("Failed to load materials:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMaterials = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return materials.filter((item) => {
      const matchCategory =
        category === "" ||
        item.category === category;

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.feature ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.color ?? "")
          .toLowerCase()
          .includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [materials, search, category]);

  return (
    <>
      {/* HERO */}
      <MaterialHero />

      {/* SEARCH */}
      <section className="border-b bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <MaterialSearch
            value={search}
            onChange={setSearch}
          />
        </div>
      </section>

      {/* CATEGORY */}
      <MaterialCategory
        value={category}
        onChange={setCategory}
      />

      {/* COUNT */}
      <section className="container mx-auto max-w-7xl px-4 py-8">
        <p className="text-gray-600">
          Menampilkan{" "}
          <span className="font-semibold text-amber-600">
            {filteredMaterials.length}
          </span>{" "}
          material
        </p>
      </section>

      {/* LOADING */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />

          <p className="text-stone-500">
            Memuat material...
          </p>
        </div>
      ) : (
        <MaterialGrid
          materials={filteredMaterials}
        />
      )}
    </>
  );
}