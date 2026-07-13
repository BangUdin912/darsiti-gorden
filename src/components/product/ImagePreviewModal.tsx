"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  image: string;
  onClose: () => void;
}

export default function ImagePreviewModal({
  image,
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-video">
          <Image
            src={image}
            alt="Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}