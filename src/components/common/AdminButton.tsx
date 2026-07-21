"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function AdminButton() {
  return (
    <Link
      href="/login"
      className="
        group
        inline-flex
        h-11
        items-center
        gap-2.5
        rounded-xl
        border
        border-stone-200
        bg-white
        px-4
        text-sm
        font-medium
        text-stone-700
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-amber-500
        hover:bg-amber-500
        hover:text-white
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-amber-300
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-amber-100
          transition-all
          duration-300
          group-hover:bg-white/20
        "
      >
        <Shield
          size={17}
          className="
            text-amber-600
            transition-colors
            duration-300
            group-hover:text-white
          "
        />
      </span>

      <span className="whitespace-nowrap">
        Admin Panel
      </span>
    </Link>
  );
}