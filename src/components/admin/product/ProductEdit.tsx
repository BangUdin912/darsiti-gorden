"use client";

import { X } from "lucide-react";

import type { Product } from "@/types/product";
import ProductForm from "./ProductForm";

interface ProductEditProps {
  item: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductEdit({
  item,
  onClose,
  onSuccess,
}: ProductEditProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

      {/* MODAL BOX */}
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Edit Product
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Perbarui data product yang sudah ada.
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-stone-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}
        <div className="p-6">
          <ProductForm
            initialValues={item}
            submitText="Update Product"
            onSuccess={() => {
              onSuccess();
              onClose();
            }}
          />
        </div>

      </div>
    </div>
  );
}