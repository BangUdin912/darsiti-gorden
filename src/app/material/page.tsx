"use client";

import { useEffect, useMemo, useState } from "react";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

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
  const [category, setCategory] =
    useState<MaterialCategoryType | "">("");

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
    try {
      setLoading(true);

      const data =
        await materialService.getActive();

      setMaterials(data);
    } catch (error) {
      console.error(
        "Failed to load materials:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredMaterials = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    return materials.filter((item) => {
      const matchCategory =
        category === "" ||
        item.category === category;

      const matchSearch =
        item.name
          .toLowerCase()
          .includes(keyword) ||
        item.category
          .toLowerCase()
          .includes(keyword) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.feature ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.color ?? "")
          .toLowerCase()
          .includes(keyword);

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [materials, search, category]);

  return (
    <>
      <PageHeader
        title="Material Gorden"
        description="Temukan berbagai pilihan material gorden berkualitas dengan beragam tekstur, warna, dan karakter yang dapat disesuaikan dengan kebutuhan rumah, kantor, hotel, apartemen, maupun proyek interior Anda."
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Material",
          },
        ]}
      />

      {/* Search */}
      <section className="border-b bg-stone-50 py-8">
        <Container>
          <MaterialSearch
            value={search}
            onChange={setSearch}
          />
        </Container>
      </section>

      {/* Category */}
      <MaterialCategory
        value={category}
        onChange={setCategory}
      />

      {/* Count */}
      <section className="bg-white py-8">
        <Container>
          <p className="text-stone-600">
            Menampilkan{" "}
            <span className="font-semibold text-primary">
              {filteredMaterials.length}
            </span>{" "}
            material.
          </p>
        </Container>
      </section>

      {/* Content */}
      {loading ? (
        <div className="py-24 text-center">
          <div
            className="
              mx-auto
              mb-5
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-primary
              border-t-transparent
            "
          />

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