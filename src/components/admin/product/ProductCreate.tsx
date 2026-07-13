"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";

interface ProductCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductCreate({
  open,
  onOpenChange,
}: ProductCreateProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          submitText="Tambah Product"
          onSuccess={() => {
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}