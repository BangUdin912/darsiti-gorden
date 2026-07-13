import { notFound } from "next/navigation";

import { materialService } from "@/lib/materialService";

import MaterialDetail from "@/components/material/MaterialDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;

  const material =
    await materialService.getBySlug(slug);

  if (!material) {
    return {
      title: "Material Tidak Ditemukan",
    };
  }

  return {
    title: `${material.name} | Darsiti Gorden`,
    description:
      material.description ??
      `Material ${material.name}`,
    openGraph: {
      title: material.name,
      description: material.description ?? "",
      images: material.image
        ? [material.image]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const materials =
    await materialService.getActive();

  return materials.map((item) => ({
    slug: item.slug,
  }));
}

export default async function MaterialDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const material =
    await materialService.getBySlug(slug);

  if (!material) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <MaterialDetail material={material} />
    </main>
  );
}