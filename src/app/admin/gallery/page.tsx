"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import GalleryTable from "@/components/admin/gallery/GalleryTable";
import GalleryCreate from "@/components/admin/gallery/GalleryCreate";

export default function GalleryPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery Management</h1>
          <p className="text-sm text-stone-500">
            Kelola project gallery (foto, kategori, dan featured)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
        >
          <Plus size={16} />
          Tambah Gallery
        </button>
      </div>

      {/* TABLE */}
      <GalleryTable />

      {/* CREATE MODAL */}
      <GalleryCreate
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}