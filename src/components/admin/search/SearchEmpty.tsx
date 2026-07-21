"use client";

import { SearchX } from "lucide-react";

interface SearchEmptyProps {
  keyword: string;
}

export default function SearchEmpty({
  keyword,
}: SearchEmptyProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        px-6
        py-12
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-amber-100
          text-amber-500
        "
      >
        <SearchX size={30} />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-stone-900
        "
      >
        Data tidak ditemukan
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
          text-stone-500
        "
      >
        Tidak ada data yang cocok dengan kata kunci{" "}
        <span className="font-medium text-stone-700">
          "{keyword}"
        </span>.
      </p>
    </div>
  );
}