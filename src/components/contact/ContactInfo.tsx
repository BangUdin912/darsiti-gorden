"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
} from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+62 819-1511-8782",
    description: "Hubungi kami untuk konsultasi dan pemesanan.",
    href: "https://wa.me/6281915118782",
    button: "Chat WhatsApp",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@darsitigorden.com",
    description: "Kirim pertanyaan atau permintaan penawaran.",
    href: "mailto:info@darsitigorden.com",
    button: "Kirim Email",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Alamat",
    value: "Purwokerto, Jawa Tengah",
    description: "Silakan hubungi kami sebelum berkunjung.",
    href: "https://maps.google.com",
    button: "Lihat Lokasi",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            Informasi Kontak
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Kami Siap
            <span className="text-amber-600"> Membantu Anda</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Jangan ragu menghubungi kami untuk konsultasi, survey,
            pemilihan bahan, maupun pemesanan gorden sesuai kebutuhan
            rumah atau proyek Anda.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 lg:grid-cols-3">

          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 font-semibold text-stone-800">
                  {item.value}
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  target="_blank"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-amber-600"
                >
                  {item.title === "Alamat" ? (
                    <Navigation className="h-5 w-5" />
                  ) : (
                    <MessageCircle className="h-5 w-5" />
                  )}

                  {item.button}
                </Link>

              </div>
            );
          })}

        </div>

        {/* Bottom Card */}
        <div className="mt-16 rounded-[32px] bg-gradient-to-r from-stone-900 via-stone-800 to-stone-700 p-10 text-white shadow-xl">

          <div className="grid items-center gap-8 lg:grid-cols-2">

            <div>

              <div className="flex items-center gap-3">

                <Clock className="h-8 w-8 text-amber-400" />

                <h3 className="text-3xl font-bold">
                  Jam Operasional
                </h3>

              </div>

              <p className="mt-5 text-stone-300 leading-8">
                Kami siap melayani konsultasi, survey, dan pemesanan
                pada jam operasional berikut.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-stone-300">
                  Senin - Sabtu
                </p>

                <h4 className="mt-2 text-2xl font-bold">
                  08.00 - 17.00 WIB
                </h4>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-stone-300">
                  Minggu
                </p>

                <h4 className="mt-2 text-2xl font-bold">
                  By Appointment
                </h4>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}