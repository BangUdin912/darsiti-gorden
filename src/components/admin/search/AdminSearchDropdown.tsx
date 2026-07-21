"use client";

import Link from "next/link";
import {
  Package,
  Images,
  Layers3,
  MessageSquare,
  Search,
} from "lucide-react";

import type { AdminSearchResult } from "@/types/adminSearch";

interface Props {
  results: AdminSearchResult[];
  loading: boolean;
  keyword: string;
  onClose: () => void;
}

export default function AdminSearchDropdown({
  results,
  loading,
  keyword,
  onClose,
}: Props) {
  if (!keyword.trim()) return null;

  const groups = {
    product: results.filter(
      (item) => item.type === "product"
    ),
    material: results.filter(
      (item) => item.type === "material"
    ),
    gallery: results.filter(
      (item) => item.type === "gallery"
    ),
    message: results.filter(
      (item) => item.type === "message"
    ),
  };

  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-full
        mt-2
        overflow-hidden
        rounded-2xl
        border
        border-stone-200
        bg-white
        shadow-2xl
        z-50
      "
    >
      {loading ? (
        <div className="p-8 text-center text-sm text-stone-500">
          Mencari...
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <Search
            size={36}
            className="text-stone-300"
          />

          <div>
            <h3 className="font-semibold text-stone-800">
              Tidak ditemukan
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Tidak ada data yang cocok dengan "
              {keyword}"
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto">

          <SearchSection
            title="Product"
            icon={<Package size={16} />}
            items={groups.product}
            onClose={onClose}
          />

          <SearchSection
            title="Material"
            icon={<Layers3 size={16} />}
            items={groups.material}
            onClose={onClose}
          />

          <SearchSection
            title="Gallery"
            icon={<Images size={16} />}
            items={groups.gallery}
            onClose={onClose}
          />

          <SearchSection
            title="Pesan"
            icon={<MessageSquare size={16} />}
            items={groups.message}
            onClose={onClose}
          />

        </div>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  items: AdminSearchResult[];
  onClose: () => void;
}

function SearchSection({
  title,
  icon,
  items,
  onClose,
}: SectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-stone-100 last:border-none">

      <div
        className="
          sticky
          top-0
          flex
          items-center
          gap-2
          bg-stone-50
          px-4
          py-2
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-stone-500
        "
      >
        {icon}
        {title}
      </div>

      {items.map((item) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={item.href}
          onClick={onClose}
          className="
            block
            border-b
            border-stone-100
            px-4
            py-3
            transition
            hover:bg-amber-50
            last:border-none
          "
        >
          <h4 className="font-medium text-stone-900">
            {item.title}
          </h4>

          {item.subtitle && (
            <p className="mt-1 text-sm text-stone-500 line-clamp-1">
              {item.subtitle}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}