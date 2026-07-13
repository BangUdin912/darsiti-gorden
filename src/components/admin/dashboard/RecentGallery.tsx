import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/types/gallery";

interface Props {
  items: GalleryItem[];
}

export default function RecentGallery({ items }: Props) {
  const recent = items ?? [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Gallery Terbaru</h2>

        <Link
          href="/admin/gallery"
          className="text-sm font-semibold text-amber-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border-2 border-dashed border-stone-200">
          <p className="text-stone-400">Belum ada gallery.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border p-3"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src={item.image_url || "/placeholder.jpg"}
                  alt={item.title || "Gallery"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

              <Link
                href={`/admin/gallery/edit/${item.id}`}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}