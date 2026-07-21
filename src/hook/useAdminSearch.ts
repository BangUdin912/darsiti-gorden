"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { adminSearchService } from "@/lib/adminSearchService";
import type { AdminSearchResult } from "@/types/adminSearch";

export function useAdminSearch() {
  const [keyword, setKeyword] = useState("");

  const [results, setResults] = useState<
    AdminSearchResult[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const search = useCallback(
    async (value: string) => {
      const query = value.trim();

      if (!query) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await adminSearchService.search(query);

        setResults(data);
      } catch (err) {
        console.error(
    "[useAdminSearch]",
    err
);

        setResults([]);
        setError(
          "Terjadi kesalahan saat melakukan pencarian."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      search(keyword);
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword, search]);

  function clear() {
    setKeyword("");
    setResults([]);
    setError(null);
    setLoading(false);
  }

  return {
    keyword,
    setKeyword,

    results,

    loading,

    error,

    clear,

    search,
  };
}