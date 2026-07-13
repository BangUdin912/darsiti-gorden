"use client";

import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

import ProductHero from "@/components/product/ProductHero";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductLightbox from "@/components/product/ProductLightbox";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  // Lightbox
  const [openPreview, setOpenPreview] = useState(false);

  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getAll();

        setProducts(
          data.filter((item) => item.is_active)
        );
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((item) => {
      const categories = item.category ?? [];

      const matchCategory =
        category === "Semua" ||
        categories.includes(category);

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        (item.short_description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        categories.join(" ").toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [products, search, category]);

  function handlePreview(index: number) {
    setPreviewIndex(index);
    setOpenPreview(true);
  }

  return (
    <>
      <ProductHero
  value={search}
  onChange={setSearch}
/>

      {/* Search */}
      <section className="border-b bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <input
            type="text"
            placeholder="Cari produk gorden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </section>

      {/* Category */}
      <CategoryFilter
        products={products}
        current={category}
        onSelect={setCategory}
      />

      {/* Count */}
      <section className="container mx-auto max-w-7xl px-4 py-8">
        <p className="text-gray-600">
          Menampilkan{" "}
          <span className="font-semibold text-amber-600">
            {filteredProducts.length}
          </span>{" "}
          produk
        </p>
      </section>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Memuat produk...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="container mx-auto max-w-7xl px-4 pb-20">
          <div className="rounded-3xl border-2 border-dashed border-stone-200 bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-stone-700">
              Produk Tidak Ditemukan
            </h3>

            <p className="mt-3 text-stone-500">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
          </div>
        </div>
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onOpen={handlePreview}
          />

          <ProductLightbox
            items={filteredProducts}
            currentIndex={previewIndex}
            isOpen={openPreview}
            onClose={() => setOpenPreview(false)}
            onPrev={() =>
              setPreviewIndex((prev) =>
                prev === 0
                  ? filteredProducts.length - 1
                  : prev - 1
              )
            }
            onNext={() =>
              setPreviewIndex((prev) =>
                prev === filteredProducts.length - 1
                  ? 0
                  : prev + 1
              )
            }
          />
        </>
      )}
    </>
  );
}