import Hero from "src/components/home/Hero";
import CategorySection from "src/components/home/CategorySection";
import CurtainMaterials from "src/components/home/CurtainMaterials";
import FeaturedProducts from "src/components/home/FeaturedProducts";
import Services from "src/components/home/Services";
import OrderProcess from "src/components/home/OrderProcess";
import GalleryPreview from "src/components/home/GalleryPreview";
import BrandTrust from "src/components/home/BrandTrust";
import Testimonials from "src/components/home/Testimonials";
import FAQ from "src/components/home/FAQ";
import CTA from "src/components/home/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jasa Gorden Custom Purwokerto",
  description:
    "Darsiti Gorden melayani pembuatan dan pemasangan gorden custom untuk rumah, hotel, kantor, masjid, apartemen, villa, dan cafe di Purwokerto dan sekitarnya.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Kategori Produk */}
      <CategorySection />

      {/* Edukasi Jenis Bahan */}
      <CurtainMaterials />

            {/* Layanan */}
      <Services />

      {/* Produk Unggulan */}
      <FeaturedProducts />

      {/* Cara Pemesanan */}
      <OrderProcess />



      {/* Portofolio */}
      <GalleryPreview />

      {/* Kepercayaan */}
      <BrandTrust />

      {/* Testimoni */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />
    </>
  );
}