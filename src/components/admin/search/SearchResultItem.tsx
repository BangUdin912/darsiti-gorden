"use client";

import Link from "next/link";
import {
  Package,
  Images,
  Layers3,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

import type { AdminSearchResult } from "@/types/adminSearch";

interface Props {
  item: AdminSearchResult;
  onClick?: () => void;
}

export default function SearchResultItem({
  item,
  onClick,
}: Props) {
  const Icon = getIcon(item.type);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-4
        border-b
        border-stone-100
        px-4
        py-3
        transition-all
        duration-200
        hover:bg-amber-50
        last:border-b-0
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-amber-100
          text-amber-600
          transition
          group-hover:bg-amber-500
          group-hover:text-white
        "
      >
        <Icon size={18} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-stone-900">
          {item.title}
        </h4>

        {item.subtitle && (
          <p className="mt-1 truncate text-sm text-stone-500">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight
        size={18}
        className="
          text-stone-300
          transition
          group-hover:translate-x-1
          group-hover:text-amber-500
        "
      />
    </Link>
  );
}

function getIcon(type: AdminSearchResult["type"]) {
  switch (type) {
    case "product":
      return Package;

    case "material":
      return Layers3;

    case "gallery":
      return Images;

    case "message":
      return MessageSquare;

    default:
      return Package;
  }
}