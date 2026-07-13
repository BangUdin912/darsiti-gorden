"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import GalleryForm from "./GalleryForm";

interface GalleryCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GalleryCreate({
  open,
  onOpenChange,
}: GalleryCreateProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Gallery</DialogTitle>
        </DialogHeader>

        <GalleryForm
          submitText="Tambah Gallery"
          onSuccess={() => {
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}