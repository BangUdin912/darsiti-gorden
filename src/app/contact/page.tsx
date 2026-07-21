import PageHeader from "@/components/common/PageHeader";

import ContactForm from "@/components/contact/ContactForm";
import GoogleMaps from "@/components/contact/GoogleMaps";

export const metadata = {
  title: "Kontak | Darsiti Gorden Purwokerto",
  description:
    "Hubungi Darsiti Gorden Purwokerto untuk konsultasi gratis, survey lokasi, pengukuran, pemilihan material, hingga pemasangan gorden berkualitas untuk rumah, kantor, hotel, apartemen, sekolah, dan berbagai proyek lainnya.",
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