"use client";

import { useEffect, useRef, useState } from "react";

import { searchService } from "@/lib/searchService";
import type { SearchResult } from "@/types/search";

export function useGlobalSearch() {
  const [keyword, setKeyword] =
    useState("");

  const [results, setResults] =
    useState<SearchResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const debounceRef =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const response =
          await searchService.search(keyword);

        setResults(response.results);
      } catch (err) {
        console.error(
          "Global Search:",
          err
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [keyword]);

  return {
    keyword,
    setKeyword,

    results,

    loading,

    open,
    setOpen,
  };
}