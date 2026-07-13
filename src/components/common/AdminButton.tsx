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
        items-center
        gap-3
        rounded-full
        border
        border-stone-200
        bg-white/90
        px-5
        py-3
        text-sm
        font-semibold
        text-stone-700
        shadow-sm
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-amber-500
        hover:bg-amber-500
        hover:text-white
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-amber-400
        focus:ring-offset-2
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-amber-100
          text-amber-600
          transition-all
          duration-300
          group-hover:bg-white/20
          group-hover:text-white
        "
      >
        <Shield size={18} />
      </span>

      <div className="flex flex-col leading-tight">
        <span>Admin Panel</span>
        <span className="text-xs font-normal text-stone-500 transition-colors group-hover:text-amber-100">
          Secure Login
        </span>
      </div>
    </Link>
  );
}