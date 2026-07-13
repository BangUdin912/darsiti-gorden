"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import MaterialTable from "@/components/admin/material/MaterialTable";
import MaterialCreate from "@/components/admin/material/MaterialCreate";

export default function MaterialPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-start justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Material Management
          </h1>

          <p className="text-sm text-stone-500">
            Kelola bahan gorden (kategori, gambar, dan featured)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
        >
          <Plus size={16} />
          Tambah Material
        </button>

      </div>

      <MaterialTable />

      {open && (
        <MaterialCreate
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);

            // reload halaman supaya tabel langsung update
            window.location.reload();
          }}
        />
      )}
    </>
  );
}