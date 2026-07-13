import Hero from "src/components/contact/Hero";

import ContactForm from "src/components/contact/ContactForm";
import GoogleMaps from "src/components/contact/GoogleMaps";


export const metadata = {
  title: "Kontak | Darsiti Gorden",
  description:
    "Hubungi Darsiti Gorden untuk konsultasi gratis, survey, pengukuran, dan pemasangan gorden berkualitas.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <ContactForm />
      <GoogleMaps />

    </main>
  );
}