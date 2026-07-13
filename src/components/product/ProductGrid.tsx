import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  onOpen: (index: number) => void;
}

export default function ProductGrid({
  products,
  onOpen,
}: Props) {
  return (
    <section className="bg-stone-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">

        {/* HEADER */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-3xl font-bold text-stone-900">
              Koleksi Produk
            </h2>

            <p className="mt-2 text-gray-600">
              Temukan berbagai pilihan gorden berkualitas untuk rumah, kantor,
              hotel, apartemen, sekolah, dan masjid.
            </p>
          </div>

          <div className="rounded-full bg-white px-5 py-3 shadow">
            <span className="font-semibold text-stone-700">
              {products.length}
            </span>{" "}
            <span className="text-gray-500">Produk</span>
          </div>

        </div>

        {/* GRID */}
        {products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
  <ProductCard
    key={product.id}
    product={product}
    onOpen={() => onOpen(index)}
  />
))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white py-20 text-center shadow">

            <h3 className="text-2xl font-bold text-stone-900">
              Produk belum tersedia
            </h3>

            <p className="mt-3 text-gray-500">
              Saat ini belum ada produk yang dapat ditampilkan.
            </p>

            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
              >
                Kembali ke Beranda
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}