import type { Metadata } from "next";
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
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const material =
    await materialService.getBySlug(slug);

  if (!material) {
    return {
      title: "Material Tidak Ditemukan",
      description:
        "Material yang Anda cari tidak ditemukan.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${material.name} | Darsiti Gorden Purwokerto`;

  const description =
    material.description ??
    `${material.name} merupakan salah satu material premium yang digunakan Darsiti Gorden Purwokerto untuk menghasilkan gorden berkualitas tinggi, elegan, dan tahan lama.`;

  return {
    title,
    description,

    keywords: [
      material.name,
      "Material Gorden",
      "Kain Gorden",
      "Gorden Purwokerto",
      "Darsiti Gorden",
      "Blackout",
      "Vitrase",
      "Interior Rumah",
      "Dekorasi Interior",
    ],

    alternates: {
      canonical: `/material/${material.slug}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },

    openGraph: {
      title,
      description,
      url: `/material/${material.slug}`,
      siteName: "Darsiti Gorden",
      locale: "id_ID",
      type: "website",

      images: [
        {
          url:
            material.image ||
            "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: material.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        material.image ||
          "/images/og-image.jpg",
      ],
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
        image={
          material.image ||
          "/images/gallery/gordenn2.jpg"
        }
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