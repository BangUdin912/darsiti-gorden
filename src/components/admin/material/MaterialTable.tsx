"use client";

import { useEffect, useMemo, useState } from "react";

import type { Material } from "@/types/material";
import { materialService } from "@/lib/materialService";

import MaterialFilter from "./MaterialFilter";
import MaterialRow from "./MaterialRow";
import MaterialCreate from "./MaterialCreate";
import MaterialEdit from "./MaterialEdit";
import MaterialDeleteDialog from "./MaterialDeleteDialog";

export default function MaterialTable() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState<boolean | null>(null);

  // MODAL
  const [openCreate, setOpenCreate] = useState(false);
  const [selected, setSelected] = useState<Material | null>(null);
  const [deleteItem, setDeleteItem] = useState<Material | null>(null);

  /**
   * TYPE GUARD
   */
  function isMaterialArray(data: unknown): data is Material[] {
    return Array.isArray(data);
  }

  /**
   * FETCH DATA
   */
  async function fetchMaterial() {
    setLoading(true);

    try {
      const data = await materialService.getAll();

      if (isMaterialArray(data)) {
        setMaterials(data);
      } else {
        setMaterials([]);
      }
    } catch (err) {
      console.error("fetchMaterial:", err);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMaterial();
  }, []);

  /**
   * FILTER
   */
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category
        ? item.category === category
        : true;

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
  }, [materials, search, category, featured]);

  return (
    <div className="space-y-6">

      {/* FILTER */}
      <MaterialFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        featured={featured}
        onFeaturedChange={setFeatured}

      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full text-left text-sm">

<thead className="bg-stone-100">
  <tr>
    <th className="w-16 p-3 text-center">No</th>
    <th className="p-3 text-center">Gambar</th>
    <th className="p-3 text-center">Nama Bahan</th>
    <th className="p-3 text-center">Kategori</th>
    <th className="p-3 text-center">Warna</th>
    <th className="p-3 text-center">Featured</th>
    <th className="p-3 text-center">Aksi</th>
  </tr>
</thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Memuat data...
                </td>
              </tr>
            ) : filteredMaterials.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Tidak ada data bahan.
                </td>
              </tr>
            ) : (
              filteredMaterials.map((item, index) => (
  <MaterialRow
    key={item.id}
    no={index + 1}
    material={item}
    onEdit={() => setSelected(item)}
    onDelete={() => setDeleteItem(item)}
  />
))
            )}

          </tbody>

        </table>

      </div>

      {/* CREATE */}
      {openCreate && (
        <MaterialCreate
          onClose={() => setOpenCreate(false)}
          onSuccess={() => {
            setOpenCreate(false);
            fetchMaterial();
          }}
        />
      )}

      {/* EDIT */}
      {selected && (
        <MaterialEdit
          material={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setSelected(null);
            fetchMaterial();
          }}
        />
      )}

      {/* DELETE */}
      {deleteItem && (
        <MaterialDeleteDialog
          material={deleteItem}
          onClose={() => setDeleteItem(null)}
          onSuccess={() => {
            setDeleteItem(null);
            fetchMaterial();
          }}
        />
      )}

    </div>
  );
}