"use client";

import { useEffect, useMemo, useState } from "react";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductLightbox from "@/components/product/ProductLightbox";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

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
        console.error(
          "Failed to load products:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return products.filter((item) => {
      const categories =
        item.category ?? [];

      const matchCategory =
        category === "Semua" ||
        categories.includes(category);

      const matchSearch =
        item.name
          .toLowerCase()
          .includes(keyword) ||
        (item.short_description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        categories
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [products, search, category]);

  function handlePreview(index: number) {
    setPreviewIndex(index);
    setOpenPreview(true);
  }

  return (
    <>
      <PageHeader
        title="Produk Gorden"
        description="Temukan berbagai pilihan model gorden berkualitas dengan desain modern, elegan, dan dapat disesuaikan untuk rumah, kantor, hotel, apartemen, sekolah, maupun berbagai kebutuhan interior lainnya."
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Produk",
          },
        ]}
      />

      {/* Search */}
      <section className="border-b bg-stone-50 py-8">
        <Container>
          <input
            type="search"
            placeholder="Cari produk gorden..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-stone-200
              bg-white
              px-5
              text-sm
              shadow-sm
              outline-none
              transition

              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />
        </Container>
      </section>

      {/* Category */}
      <CategoryFilter
        products={products}
        current={category}
        onSelect={setCategory}
      />

      {/* Count */}
      <section className="bg-white py-8">
        <Container>
          <p className="text-stone-600">
            Menampilkan{" "}
            <span className="font-semibold text-primary">
              {filteredProducts.length}
            </span>{" "}
            produk.
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
            Memuat produk...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <Container className="pb-20">
          <div className="rounded-3xl border-2 border-dashed border-stone-200 bg-white py-20 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-stone-700">
              Produk Tidak Ditemukan
            </h3>

            <p className="mt-3 text-stone-500">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
          </div>
        </Container>
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
            onClose={() =>
              setOpenPreview(false)
            }
            onPrev={() =>
              setPreviewIndex((prev) =>
                prev === 0
                  ? filteredProducts.length - 1
                  : prev - 1
              )
            }
            onNext={() =>
              setPreviewIndex((prev) =>
                prev ===
                filteredProducts.length - 1
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