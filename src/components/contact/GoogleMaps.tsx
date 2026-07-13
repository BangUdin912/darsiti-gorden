"use client";

import Link from "next/link";
import {
  MapPin,
  Navigation,
  Clock3,
  Phone,
  ExternalLink,
} from "lucide-react";

export default function GoogleMaps() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">



          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Kunjungi
            <span className="text-amber-600"> Darsiti Gorden</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Datang langsung ke showroom kami untuk melihat koleksi bahan,
            berkonsultasi mengenai desain, serta mendapatkan rekomendasi
            gorden yang sesuai dengan kebutuhan rumah maupun proyek Anda.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left Information */}
          <div className="space-y-6">

            {/* Alamat */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-lg">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100">
                  <MapPin className="h-7 w-7 text-amber-700" />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Alamat
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Jl. KKN Unsoed Kedungmalang RT 04 RW 03 Kecamatan Sumbang, Kabupaten Banyumas, Jawa Tengah 53183
                  </p>

                </div>

              </div>

            </div>

            {/* Jam Operasional */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-lg">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                  <Clock3 className="h-7 w-7 text-green-600" />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Jam Operasional
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Senin - Sabtu
                    <br />
                    08.00 - 17.00 WIB
                  </p>

                </div>

              </div>

            </div>

            {/* WhatsApp */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-lg">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                  <Phone className="h-7 w-7 text-green-600" />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    WhatsApp
                  </h3>

                  <p className="mt-3 text-gray-600">
                    0819-1511-8782
                  </p>

                </div>

              </div>

            </div>

            {/* Button */}
            <Link
              href="https://maps.app.goo.gl/wneghmtRSCZxfoGo6"
              target="_blank"
              className="flex items-center justify-center gap-3 rounded-2xl bg-stone-900 px-6 py-4 font-semibold text-white transition hover:bg-amber-600"
            >
              <Navigation className="h-5 w-5" />

              Buka di Google Maps

              <ExternalLink className="h-4 w-4" />
            </Link>

          </div>

          {/* Google Maps */}

          <div className="lg:col-span-2">

            <div className="overflow-hidden rounded-[32px] border bg-white shadow-xl">

              <div className="overflow-hidden rounded-[32px] border bg-white shadow-xl">
  <iframe
    title="Lokasi Darsiti Gorden"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.6178189837624!2d109.24997707476189!3d-7.396648992613278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f3df5d0f3d1%3A0xf0ec9f166f2d1339!2sDarsiti%20Gorden!5e0!3m2!1sid!2sid!4v1782873557328!5m2!1sid!2sid"
    className="h-[650px] w-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}