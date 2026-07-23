import type { Metadata } from "next";

import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Galeri Pemasangan Gorden",
  description:
    "Lihat hasil pemasangan gorden custom Darsiti Gorden pada rumah, hotel, kantor, villa, cafe, apartemen, dan berbagai proyek interior lainnya.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}