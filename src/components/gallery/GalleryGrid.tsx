import { GalleryItem } from "@/types/gallery";
import GalleryCard from "./GalleryCard";

interface Props {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}

export default function GalleryGrid({
  items,
  onOpen,
}: Props) {
  return (
    <section className="bg-stone-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">

        {/* HEADER */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-3xl font-bold text-stone-900">
              Hasil Pemasangan
            </h2>

            <p className="mt-2 text-gray-600">
              Dokumentasi hasil pemasangan Darsiti Gorden.
            </p>
          </div>

          <div className="rounded-full bg-white px-5 py-3 shadow">
            <span className="font-semibold text-stone-700">
              {items.length}
            </span>{" "}
            <span className="text-gray-500">Project</span>
          </div>

        </div>

        {/* GRID */}
        {items.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpen={() => onOpen(index)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white py-20 text-center shadow">

            <h3 className="text-2xl font-bold text-stone-900">
              Gallery belum tersedia
            </h3>

            <p className="mt-3 text-gray-500">
              Saat ini belum ada proyek yang ditampilkan.
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