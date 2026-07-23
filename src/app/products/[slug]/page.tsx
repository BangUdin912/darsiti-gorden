import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHeader from "@/components/common/PageHeader";
import ProductDetail from "@/components/product/ProductDetail";
import ProductSchema from "@/components/seo/ProductSchema";

import { productService } from "@/lib/productService";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await productService.getBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak ditemukan.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    product.seo_title ??
    `${product.name} | Darsiti Gorden Purwokerto`;

  const description =
    product.seo_description ??
    product.short_description ??
    product.description ??
    `${product.name} merupakan produk gorden custom premium dari Darsiti Gorden Purwokerto.`;

  return {
    title,
    description,

    keywords: [
      product.name,
      ...product.category,
      ...product.room,
      product.type,
      "Darsiti Gorden",
      "Gorden Purwokerto",
      "Jasa Gorden Custom",
      "Gorden Minimalis",
      "Gorden Rumah",
      "Gorden Kantor",
      "Gorden Hotel",
      "Blackout",
      "Vitrase",
      "Roller Blind",
      "Vertical Blind",
      "Roman Blind",
    ],

    alternates: {
      canonical: `/products/${product.slug}`,
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
      url: `/products/${product.slug}`,
      siteName: "Darsiti Gorden",
      locale: "id_ID",
      type: "website",

      images: [
        {
          url: product.image || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image || "/images/og-image.jpg"],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductSchema product={product} />

      <PageHeader
        title={product.name}
        description={`Temukan informasi lengkap mengenai ${product.name}, mulai dari desain, pilihan material, keunggulan, hingga rekomendasi penggunaan untuk rumah, kantor, hotel, apartemen, sekolah, dan berbagai proyek interior lainnya.`}
        image={product.image || "/images/gallery/gordenn2.jpg"}
        breadcrumb={[
          {
            label: "Produk",
            href: "/product",
          },
          {
            label: product.name,
          },
        ]}
      />

      <main className="bg-stone-50 py-12 lg:py-20">
        <ProductDetail product={product} />
      </main>
    </>
  );
}