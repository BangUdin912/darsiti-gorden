import { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHeader from "@/components/common/PageHeader";
import ProductDetail from "@/components/product/ProductDetail";

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

  const product =
    await productService.getBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Darsiti Gorden",
    };
  }

  const title =
    product.seo_title ??
    `${product.name} | Darsiti Gorden`;

  const description =
    product.seo_description ??
    product.short_description ??
    product.description ??
    `Produk ${product.name}`;

  return {
    title,
    description,

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image
        ? [product.image]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const product =
    await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={product.name}
        description={`Temukan informasi lengkap mengenai ${product.name}, mulai dari desain, pilihan material, keunggulan, hingga rekomendasi penggunaan untuk rumah, kantor, hotel, apartemen, sekolah, dan berbagai proyek interior lainnya.`}
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Produk",
            href: "/products",
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