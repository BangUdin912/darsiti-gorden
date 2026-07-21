"use client";

import { useState } from "react";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

const materials = [
  {
    title: "Blackout",
    subtitle: "Pilihan Favorit",
    image: "/images/bahan/Gorden Blackout/woodyy5.jpg",
    description:
      "Menahan cahaya hingga hampir 100%, menjaga privasi dan membantu ruangan tetap sejuk. Ideal untuk kamar tidur, home theater, dan ruang istirahat.",
    badge: "Premium",
  },
  {
    title: "Bahan Lokal",
    subtitle: "Ekonomis",
    image: "/images/bahan/Gorden Lokal/aliando1.jpg",
    description:
      "Pilihan ekonomis dengan berbagai motif dan warna menarik. Cocok untuk rumah, kos, sekolah, maupun kebutuhan sehari-hari.",
    badge: "Best Value",
  },
  {
    title: "Vitrase",
    subtitle: "Elegan",
    image: "/images/bahan/Gorden Blackout/Vitrase.jpg",
    description:
      "Memberikan pencahayaan alami yang lembut sekaligus mempercantik tampilan ruangan. Sangat cocok dipadukan dengan gorden utama.",
    badge: "Modern",
  },
  {
    title: "Roller Blind",
    subtitle: "Minimalis",
    image: "/images/bahan/Gorden Lokal/gordenn19.jpg",
    description:
      "Desain modern dan praktis dengan kontrol cahaya yang fleksibel. Cocok untuk kantor, dapur, ruang kerja, dan apartemen.",
    badge: "Office",
  },
];

export default function CurtainMaterials() {
  const [openModal, setOpenModal] = useState(false);

  const [selectedMaterial, setSelectedMaterial] =
    useState("");

  function handleConsultation(material: string) {
    setSelectedMaterial(material);
    setOpenModal(true);
  }

  return (
    <>
      <section className="bg-stone-50 py-24">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
              Bingung Memilih Bahan Gorden?
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Setiap bahan memiliki karakteristik dan fungsi yang berbeda.
              Kami siap membantu Anda memilih material yang paling sesuai
              dengan kebutuhan, pencahayaan, dan desain interior rumah Anda.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {materials.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-stone-900 shadow-md">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm font-medium text-yellow-600">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleConsultation(item.title)
                    }
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600 transition-all duration-300 hover:gap-3 hover:text-yellow-700"
                  >
                    Konsultasikan
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-[32px] bg-primary px-8 py-10 text-center text-white">
            <h3 className="text-3xl font-bold">
              Masih Belum Yakin Memilih Bahannya?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Jangan khawatir. Tim Darsiti Gorden siap memberikan
              rekomendasi bahan, warna, dan model terbaik sesuai
              kebutuhan serta anggaran Anda, tanpa biaya konsultasi.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedMaterial("");
                setOpenModal(true);
              }}
              className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ConsultationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        material={selectedMaterial}
        service="Konsultasi Material"
      />
    </>
  );
}