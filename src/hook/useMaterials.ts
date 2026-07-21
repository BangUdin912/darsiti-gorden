"use client";

import { useEffect, useState } from "react";

import { materialService } from "@/lib/materialService";
import type { Material } from "@/types/material";

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
    try {
      const data =
    await materialService.getActive();

setMaterials(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    materials,
    loading,
  };
}