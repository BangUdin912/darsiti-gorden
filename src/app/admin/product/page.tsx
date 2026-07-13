"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import ProductCreate from "@/components/admin/product/ProductCreate";
import ProductTable from "@/components/admin/product/ProductTable";

export default function ProductPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            Product Management
          </h1>

          <p className="text-sm text-stone-500">
            Kelola semua produk gorden di sini
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
        >
          <Plus size={18} />
          Tambah Product
        </button>

      </div>

      <ProductTable />

      <ProductCreate
        open={open}
        onOpenChange={setOpen}
      />

    </div>
  );
}