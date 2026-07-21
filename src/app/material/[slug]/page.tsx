import { notFound } from "next/navigation";

import PageHeader from "@/components/common/PageHeader";
import MaterialDetail from "@/components/material/MaterialDetail";

import { materialService } from "@/lib/materialService";

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
      description:
        material.description ?? "",
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
    <>
      <PageHeader
        title={material.name}
        description={`Pelajari karakteristik, keunggulan, warna, dan spesifikasi material ${material.name} yang digunakan oleh Darsiti Gorden untuk menghasilkan tampilan interior yang elegan dan berkualitas.`}
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Material",
            href: "/material",
          },
          {
            label: material.name,
          },
        ]}
      />

      <main className="bg-stone-50 py-12 lg:py-20">
        <MaterialDetail material={material} />
      </main>
    </>
  );
}