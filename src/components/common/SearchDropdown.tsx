"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Package,
  Layers3,
  Images,
  Search,
} from "lucide-react";

import type { SearchResult } from "@/types/search";

interface SearchDropdownProps {
  loading: boolean;
  results: SearchResult[];
  onClose: () => void;
}

export default function SearchDropdown({
  loading,
  results,
  onClose,
}: SearchDropdownProps) {
  function getIcon(type: SearchResult["type"]) {
    switch (type) {
      case "product":
        return <Package size={18} />;

      case "material":
        return <Layers3 size={18} />;

      case "gallery":
        return <Images size={18} />;

      default:
        return <Search size={18} />;
    }
  }

  function getLabel(type: SearchResult["type"]) {
    switch (type) {
      case "product":
        return "Produk";

      case "material":
        return "Material";

      case "gallery":
        return "Galeri";

      default:
        return "";
    }
  }

  return (
    <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">

      {/* Loading */}
      {loading && (
        <div className="p-6 text-center text-sm text-stone-500">
          Mencari...
        </div>
      )}

      {/* Empty */}
      {!loading && results.length === 0 && (
        <div className="p-6 text-center text-sm text-stone-500">
          Tidak ada hasil ditemukan
        </div>
      )}

      {/* Result */}
      {!loading && results.length > 0 && (
        <div className="max-h-96 overflow-y-auto">

          {results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 border-b border-stone-100 p-4 transition hover:bg-stone-50"
            >
              {/* Image */}
              <div className="relative h-14 w-14 overflow-hidden rounded-lg border bg-stone-100">

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {getIcon(item.type)}
                  </div>
                )}

              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex items-center gap-2">

                  {getIcon(item.type)}

                  <span className="text-xs font-medium text-amber-600">
                    {getLabel(item.type)}
                  </span>

                </div>

                <h4 className="mt-1 font-semibold text-stone-900">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                    {item.description}
                  </p>
                )}

              </div>

            </Link>
          ))}

        </div>
      )}

    </div>
  );
}