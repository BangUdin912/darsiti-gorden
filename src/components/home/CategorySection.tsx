import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Gorden untuk Rumah",
    desc: "Menciptakan suasana rumah yang nyaman, elegan, dan memberikan privasi maksimal untuk setiap ruangan.",
    image: "/images/gallery/gordenn7.jpg",
  },
  {
    title: "Gorden untuk Kantor",
    desc: "Desain modern dan profesional yang membantu mengatur pencahayaan serta meningkatkan kenyamanan ruang kerja.",
    image: "/images/gallery/gordenn20.jpeg",
  },
  {
    title: "Gorden untuk Hotel & Villa",
    desc: "Menghadirkan kesan mewah dengan material premium yang memberikan kenyamanan bagi setiap tamu.",
    image: "/images/gallery/gordenn26.jpg",
  },
];

export default function CategoryPreview() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-14 text-center">

          <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
            Pilihan Gorden Sesuai Kebutuhan Anda
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Kami menyediakan berbagai pilihan gorden custom yang dirancang
            sesuai fungsi dan karakter setiap ruangan, mulai dari rumah,
            kantor, hingga hotel dan villa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {categories.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <h3 className="absolute bottom-6 left-6 right-6 text-3xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="leading-7 text-muted-foreground">
                  {item.desc}
                </p>

                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition hover:gap-3"
                >
                  Lihat Koleksi
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
          >
            Lihat Semua Produk
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}