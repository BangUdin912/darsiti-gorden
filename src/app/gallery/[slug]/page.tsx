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

export default async function GalleryDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const item = await galleryService.getBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={item.title}
        description="Lihat detail hasil pengerjaan project gorden kami dengan desain dan material yang disesuaikan dengan kebutuhan ruangan."
        image="/images/gallery/gordenn2.jpg"
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

      <main className="bg-gray-50 py-12 lg:py-20">
        <Container>
          {/* Back */}
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-amber-500 transition hover:translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Gallery
          </Link>

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/9]">
            <Image
              src={
                item.image?.trim()
                  ? item.image
                  : "/images/no-image.png"
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Location */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                  <MapPin className="h-5 w-5 text-amber-500" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Lokasi
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {item.location || "-"}
                  </h3>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                  <Tag className="h-5 w-5 text-amber-500" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Kategori
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {item.category || "-"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Tentang Project
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
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