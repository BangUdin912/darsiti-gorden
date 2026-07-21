import PageHeader from "@/components/common/PageHeader";

import ContactForm from "@/components/contact/ContactForm";
import GoogleMaps from "@/components/contact/GoogleMaps";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Darsiti Gorden",
  description:
    "Hubungi Darsiti Gorden untuk konsultasi gratis, survey lokasi, dan pemesanan gorden custom di Purwokerto dan sekitarnya.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        title="Hubungi Darsiti Gorden"
        description="Konsultasikan kebutuhan gorden Anda bersama tim kami. Kami siap membantu mulai dari konsultasi, survey, pengukuran, pemilihan material, hingga pemasangan profesional."
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Kontak",
          },
        ]}
      />

      <ContactForm />

      <GoogleMaps />
    </main>
  );
}