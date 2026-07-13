"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import MaterialForm from "@/components/admin/material/MaterialForm";

import { materialService } from "@/lib/materialService";
import type { Material } from "@/types/material";

export default function MaterialEditPage() {
  const params = useParams();
  const router = useRouter();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterial();
  }, []);

  async function loadMaterial() {
    try {
      setLoading(true);

      const data = await materialService.getById(
        params.id as string
      );

      if (!data) {
        alert("Material tidak ditemukan.");
        router.push("/admin/material");
        return;
      }

      setMaterial(data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data material.");
      router.push("/admin/material");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        Memuat data...
      </div>
    );
  }

  if (!material) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Material
        </h1>

        <p className="mt-2 text-stone-500">
          Perbarui informasi material.
        </p>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        <MaterialForm
          initialValues={material}
          submitText="Update Material"
          onSuccess={() => {
            router.push("/admin/material");
          }}
        />

      </div>

    </div>
  );
}