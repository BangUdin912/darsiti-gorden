"use client";

import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

import ProductRow from "./ProductRow";
import ProductFilter from "./ProductFilter";
import ProductEdit from "./ProductEdit";
import ProductDeleteDialog from "./ProductDeleteDialog";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState<boolean | null>(null);

  const [selected, setSelected] = useState<Product | null>(null);
  const [deleteItem, setDeleteItem] = useState<Product | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);

      const data = await productService.getAll();

      setProducts(data);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === ""
          ? true
          : item.category.includes(category);

      const matchFeatured =
        featured === null
          ? true
          : item.featured === featured;

      return (
        matchSearch &&
        matchCategory &&
        matchFeatured
      );
    });
  }, [products, search, category, featured]);

  return (
    <div className="space-y-6">

      <ProductFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        featured={featured}
        setFeatured={setFeatured}
      />

      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full text-left text-sm">

<thead className="bg-stone-100">
  <tr>
    <th className="w-16 p-3 text-center">No</th>
    <th className="p-3 text-center">Produk</th>
    <th className="p-3 text-center">Kategori</th>
    <th className="p-3 text-center">Harga</th>
    <th className="p-3 text-center">Featured</th>
    <th className="p-3 text-center">Aksi</th>
  </tr>
</thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center"
                >
                  Tidak ada produk.
                </td>
              </tr>
            ) : (
filteredProducts.map((item, index) => (
  <ProductRow
    key={item.id}
    no={index + 1}
    item={item}
    onEdit={() => setSelected(item)}
    onDelete={() => setDeleteItem(item)}
  />
))
            )}

          </tbody>

        </table>

      </div>

      {selected && (
        <ProductEdit
          item={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setSelected(null);
            fetchProducts();
          }}
        />
      )}

      {deleteItem && (
        <ProductDeleteDialog
          item={deleteItem}
          onClose={() =>
            setDeleteItem(null)
          }
          onSuccess={() => {
            setDeleteItem(null);
            fetchProducts();
          }}
        />
      )}

    </div>
  );
}