import type { Metadata } from "next";

import PageHeader from "@/components/common/PageHeader";

import CompanyStory from "@/components/about/CompanyStory";
import VisionMission from "@/components/about/VisionMission";
import Values from "@/components/about/Values";
import WorkProcess from "@/components/about/WorkProcess";
import Coverage from "@/components/about/Coverage";
import CTA from "@/components/about/CTA";

const PAGE_URL = "/about";
const HEADER_IMAGE = "/images/gallery/gordenn2.jpg";
const OG_IMAGE = "/images/og-image.jpg";

export const metadata: Metadata = {
  title: "Tentang Kami",

  description:
    "Mengenal lebih dekat Darsiti Gorden, spesialis pembuatan dan pemasangan gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, villa, masjid, sekolah, dan berbagai proyek interior di Purwokerto.",

  keywords: [
    "Tentang Darsiti Gorden",
    "Profil Darsiti Gorden",
    "Darsiti Gorden Purwokerto",
    "Jasa Gorden Purwokerto",
    "Gorden Custom Purwokerto",
    "Spesialis Gorden",
    "Toko Gorden Purwokerto",
    "Pembuatan Gorden",
    "Pemasangan Gorden",
    "Interior Purwokerto",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Tentang Kami | Darsiti Gorden",

    description:
      "Kenali Darsiti Gorden sebagai penyedia jasa pembuatan dan pemasangan gorden custom terpercaya di Purwokerto dengan pengalaman menangani berbagai proyek interior.",

    url: PAGE_URL,

    siteName: "Darsiti Gorden",

    locale: "id_ID",

    type: "website",

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tentang Darsiti Gorden",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tentang Kami | Darsiti Gorden",

    description:
      "Kenali Darsiti Gorden sebagai penyedia jasa gorden custom terpercaya di Purwokerto.",

    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Tentang Darsiti Gorden"
        description="Mengenal lebih dekat Darsiti Gorden sebagai penyedia gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, masjid, sekolah, villa, dan berbagai proyek interior di Purwokerto serta sekitarnya."
        image={HEADER_IMAGE}
        breadcrumb={[
          {
            label: "Tentang Kami",
          },
        ]}
      />

      <CompanyStory />

      <VisionMission />

      <Values />

      <WorkProcess />

      <Coverage />

      <CTA />
    </>
  );
}