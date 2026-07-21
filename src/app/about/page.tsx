import type { Metadata } from "next";

import PageHeader from "@/components/common/PageHeader";

import CompanyStory from "@/components/about/CompanyStory";
import VisionMission from "@/components/about/VisionMission";
import Values from "@/components/about/Values";
import WorkProcess from "@/components/about/WorkProcess";
import Coverage from "@/components/about/Coverage";
import CTA from "@/components/about/CTA";

export const metadata: Metadata = {
  title: "Tentang Kami | Darsiti Gorden",

  description:
    "Mengenal lebih dekat Darsiti Gorden, spesialis gorden custom di Purwokerto yang melayani pembuatan dan pemasangan gorden untuk rumah, kantor, hotel, apartemen, masjid, sekolah, villa, dan berbagai kebutuhan interior.",

  keywords: [
    "Tentang Darsiti Gorden",
    "Profil Darsiti Gorden",
    "Gorden Purwokerto",
    "Jasa Gorden Purwokerto",
    "Gorden Custom",
    "Interior Rumah",
    "Pemasangan Gorden",
    "Gorden Hotel",
    "Gorden Kantor",
    "Gorden Masjid",
  ],

  alternates: {
    canonical: "/about",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Tentang Kami | Darsiti Gorden",

    description:
      "Kenali Darsiti Gorden sebagai penyedia jasa pembuatan dan pemasangan gorden custom terpercaya di Purwokerto dengan pengalaman menangani berbagai proyek interior.",

    url: "/about",

    siteName: "Darsiti Gorden",

    locale: "id_ID",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
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

    images: ["/images/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Tentang Darsiti Gorden"
        description="Mengenal lebih dekat Darsiti Gorden sebagai penyedia gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, masjid, sekolah, villa, dan berbagai proyek interior di Purwokerto serta sekitarnya."
        image="/images/og-image.jpg"
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