"use client";

import { useEffect, useMemo, useState } from "react";

import type { GalleryItem } from "@/types/gallery";
import { galleryService } from "@/lib/galleryService";

import GalleryRow from "./GalleryRow";
import GalleryFilter from "./GalleryFilter";
import GalleryEdit from "./GalleryEdit";
import GalleryDeleteDialog from "./GalleryDeleteDialog";

export default function GalleryTable() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState<boolean | null>(null);

  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<GalleryItem | null>(null);

  /**
   * TYPE GUARD
   */
  function isGalleryArray(data: unknown): data is GalleryItem[] {
    return Array.isArray(data);
  }

  /**
   * FETCH DATA
   */
  async function fetchGallery() {
    setLoading(true);

    try {
      const data = await galleryService.getAll();

      if (isGalleryArray(data)) {
        setGalleries(data);
      } else {
        setGalleries([]);
      }
    } catch (err) {
      console.error("fetchGallery error:", err);
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  /**
   * FILTER
   */
  const filteredGallery = useMemo(() => {
    return galleries.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";

      const matchSearch = title.includes(search.toLowerCase());

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
  }, [galleries, search, category, featured]);

  return (
    <div className="space-y-6">

      {/* FILTER */}
      <GalleryFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        featured={featured}
        setFeatured={setFeatured}
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full text-left text-sm">
          <thead className="bg-stone-100">
  <tr>
    <th className="w-16 p-4 text-center">No</th>
    <th className="p-4 text-center">Judul</th>
    <th className="p-4 text-center">Kategori</th>
    <th className="p-4 text-center">Lokasi</th>
    <th className="p-4 text-center">Featured</th>
    <th className="p-4 text-center">Aksi</th>
  </tr>
</thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredGallery.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Tidak ada data gallery
                </td>
              </tr>
            ) : (
filteredGallery.map((item, index) => (
  <GalleryRow
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

      {/* EDIT */}
      {selected && (
        <GalleryEdit
          item={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setSelected(null);
            fetchGallery();
          }}
        />
      )}

      {/* DELETE */}
      {deleteItem && (
        <GalleryDeleteDialog
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onSuccess={() => {
            setDeleteItem(null);
            fetchGallery();
          }}
        />
      )}

    </div>
  );
}