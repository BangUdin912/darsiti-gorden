import type { Metadata } from "next";

import MaterialClient from "./MaterialClient";

export const metadata: Metadata = {
  title: "Material Gorden Premium",
  description:
    "Berbagai pilihan bahan gorden premium berkualitas untuk rumah, hotel, kantor, apartemen, villa, dan masjid.",
};

export default function MaterialPage() {
  return <MaterialClient />;
}