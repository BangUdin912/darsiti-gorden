import type { Metadata } from "next";

import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Produk Gorden Custom",
  description:
    "Lihat koleksi gorden custom Darsiti Gorden mulai dari Blackout, Vitrase, Roller Blind, Vertical Blind hingga berbagai aksesoris gorden premium.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}