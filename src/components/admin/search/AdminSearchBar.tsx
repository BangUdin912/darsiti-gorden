"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  Loader2,
  Search,
  X,
  Package,
  Layers3,
  Images,
  MessageSquare,
} from "lucide-react";

import { useAdminSearch } from "@/hook/useAdminSearch";

export default function AdminSearchBar() {
  const {
    keyword,
    setKeyword,
    results,
    loading,
    clear,
  } = useAdminSearch();

  const [open, setOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    setOpen(
      keyword.trim().length > 0
    );
  }, [keyword]);

  function getIcon(type: string) {
    switch (type) {
      case "product":
        return (
          <Package
            size={18}
            className="text-amber-500"
          />
        );

      case "material":
        return (
          <Layers3
            size={18}
            className="text-blue-500"
          />
        );

      case "gallery":
        return (
          <Images
            size={18}
            className="text-green-500"
          />
        );

      case "message":
        return (
          <MessageSquare
            size={18}
            className="text-purple-500"
          />
        );

      default:
        return (
          <Search
            size={18}
            className="text-stone-400"
          />
        );
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-md"
    >
      {/* Search Input */}
      <div
        className="
          flex
          items-center
          rounded-xl
          border
          border-stone-200
          bg-stone-50
          px-4
          transition
          focus-within:border-amber-500
          focus-within:bg-white
          focus-within:ring-2
          focus-within:ring-amber-200
        "
      >
        <Search
          size={18}
          className="text-stone-400"
        />

        <input
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Cari Product, Material, Gallery, Pesan..."
          className="
            h-12
            w-full
            bg-transparent
            px-3
            text-sm
            outline-none
          "
        />

        {loading ? (
          <Loader2
            size={18}
            className="animate-spin text-amber-500"
          />
        ) : keyword ? (
          <button
            onClick={clear}
            className="rounded-full p-1 hover:bg-stone-200"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+10px)]
            z-50
            overflow-hidden
            rounded-2xl
            border
            border-stone-200
            bg-white
            shadow-xl
          "
        >
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-stone-500">
              Tidak ada hasil ditemukan.
            </div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-stone-100
                    p-4
                    transition
                    hover:bg-amber-50
                  "
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        h-12
                        w-12
                        rounded-lg
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-lg
                        bg-stone-100
                      "
                    >
                      {getIcon(item.type)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold text-stone-900">
                      {item.title}
                    </h4>

                    <p className="truncate text-sm text-stone-500">
                      {item.subtitle}
                    </p>
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-stone-100
                      px-2
                      py-1
                      text-xs
                      font-medium
                      capitalize
                      text-stone-600
                    "
                  >
                    {item.type}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}