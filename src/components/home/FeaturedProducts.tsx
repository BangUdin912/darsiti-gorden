import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";
import { productService } from "@/lib/productService";

export default async function FeaturedProducts() {
  const products = await productService.getFeatured(4);

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Produk Unggulan Kami
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Koleksi gorden pilihan dengan desain modern, bahan premium,
            dan dapat disesuaikan dengan kebutuhan ruangan Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {item.category[0] ?? "Produk"}
                </div>

              </div>

              {/* Content */}
              <div className="p-5">

                <h3 className="text-lg font-semibold leading-snug">
                  {item.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {item.short_description ||
                    "Custom sesuai ukuran dan kebutuhan ruangan Anda."}
                </p>

                {item.price && (
                  <p className="mt-3 font-bold text-amber-700">
                    {formatPrice(item.price)}
                  </p>
                )}

                <Link
                  href={`/product/${item.slug}`}
                  className="mt-4 inline-block font-semibold text-primary hover:underline"
                >
                  Lihat Detail →
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/product"
            className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
          >
            Lihat Semua Produk
          </Link>
        </div>

      </div>
    </section>
  );
}