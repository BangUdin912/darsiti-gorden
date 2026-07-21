import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  MapPin,
  Tag,
} from "lucide-react";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";
import GalleryDetailCTA from "@/components/gallery/GalleryDetailCTA";

import { galleryService } from "@/lib/galleryService";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const item = await galleryService.getBySlug(slug);

  if (!item) {
    return {
      title: "Gallery Tidak Ditemukan",
      description:
        "Project gallery yang Anda cari tidak ditemukan.",
    };
  }

  const title = `${item.title} | Gallery Darsiti Gorden`;

  const description =
    item.description ||
    `Hasil pemasangan gorden custom ${item.category} di ${item.location} oleh Darsiti Gorden Purwokerto.`;

  return {
    title,
    description,

    keywords: [
      item.title,
      item.category,
      item.location,
      "Gallery Gorden",
      "Pemasangan Gorden",
      "Gorden Purwokerto",
      "Interior Rumah",
      "Project Gorden",
    ],

    alternates: {
      canonical: `/gallery/${item.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: `/gallery/${item.slug}`,
      siteName: "Darsiti Gorden",
      locale: "id_ID",
      type: "article",

      images: [
        {
          url:
            item.image ||
            "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        item.image ||
          "/images/og-image.jpg",
      ],
    },
  };
}

export async function generateStaticParams() {
  const gallery =
    await galleryService.getActive();

  return gallery.map((item) => ({
    slug: item.slug,
  }));
}

export default async function GalleryDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const item =
    await galleryService.getBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={item.title}
        description={`Lihat hasil pemasangan ${item.category} di ${item.location}. Darsiti Gorden menghadirkan pemasangan rapi, material berkualitas, dan desain yang disesuaikan dengan kebutuhan setiap ruangan.`}
        image={
          item.image ||
          "/images/gallery/gordenn2.jpg"
        }
        breadcrumb={[
          {
            label: "Gallery",
            href: "/gallery",
          },
          {
            label: item.title,
          },
        ]}
      />

      <main className="bg-stone-50 py-12 lg:py-20">
        <Container>
          {/* Back */}
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-amber-600 transition hover:translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Gallery
          </Link>

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/9]">
            <Image
              src={
                item.image ||
                "/images/no-image.png"
              }
              alt={item.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Meta */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">
                    Lokasi
                  </p>

                  <h3 className="font-semibold text-stone-900">
                    {item.location || "-"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                  <Tag className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">
                    Kategori
                  </p>

                  <h3 className="font-semibold text-stone-900">
                    {item.category || "-"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-stone-900">
              Tentang Project
            </h2>

            <p className="mt-5 leading-8 text-stone-600">
              {item.description ||
                "Belum ada deskripsi untuk project ini."}
            </p>
          </section>

          {/* CTA */}
          <div className="mt-16">
            <GalleryDetailCTA
              projectTitle={item.title}
            />
          </div>
        </Container>
      </main>
    </>
  );
}