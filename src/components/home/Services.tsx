import {
  MessageCircle,
  Ruler,
  Scissors,
  Truck,
  Wrench,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: MessageCircle,
    title: "Konsultasi Gratis",
    desc: "Bantu menentukan model, bahan, dan warna gorden sesuai interior ruangan Anda.",
  },
  {
    icon: Ruler,
    title: "Survey & Pengukuran",
    desc: "Tim kami datang langsung untuk mengukur agar hasil pemasangan presisi.",
  },
  {
    icon: Scissors,
    title: "Custom Produksi",
    desc: "Semua gorden dibuat sesuai ukuran dan desain yang Anda inginkan.",
  },
  {
    icon: Truck,
    title: "Pengiriman Aman",
    desc: "Produk dikirim dengan aman langsung ke lokasi Anda tanpa kerusakan.",
  },
  {
    icon: Wrench,
    title: "Instalasi Profesional",
    desc: "Pemasangan dilakukan oleh tim berpengalaman agar hasil rapi dan presisi.",
  },
  {
    icon: Sparkles,
    title: "Finishing Premium",
    desc: "Detail akhir dikerjakan dengan standar tinggi untuk hasil elegan dan mewah.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">

      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Layanan Lengkap Gorden Custom
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Kami memberikan layanan end-to-end mulai dari konsultasi hingga pemasangan untuk hasil terbaik di setiap ruangan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border bg-stone-50 p-8 shadow-sm hover:shadow-xl transition"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}