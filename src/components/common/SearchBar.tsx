"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

import { useGlobalSearch } from "@/hook/useGlobalSearch";
import SearchDropdown from "./SearchDropdown";

export default function SearchBar() {
  const {
    keyword,
    setKeyword,
    results,
    loading,
    open,
    setOpen,
  } = useGlobalSearch();

  const containerRef =
    useRef<HTMLDivElement>(null);

  /**
   * Klik di luar SearchBar
   */
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
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

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [setOpen]);

  /**
   * ESC untuk menutup dropdown
   */
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [setOpen]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <Search
        className="
          absolute
          left-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <input
        type="search"
        value={keyword}
        placeholder="Cari produk, material, galeri..."
        onFocus={() => setOpen(true)}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="
h-11
w-full
rounded-full
border
bg-card
pl-12
pr-4
text-sm
outline-none
transition-all
focus:border-primary
"
      />

      {open && keyword.trim() && (
        <SearchDropdown
          loading={loading}
          results={results}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}