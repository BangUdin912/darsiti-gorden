"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";

import type { GalleryItem } from "@/types/gallery";


interface GalleryRowProps {
  no: number;
  item: GalleryItem;
  onEdit: () => void;
  onDelete: () => void;
}


export default function GalleryRow({
  no,
  item,
  onEdit,
  onDelete,
}: GalleryRowProps) {


  return (

    <tr className="border-t transition hover:bg-stone-50">


      {/* No */}
      <td
        className="
          p-4
          text-center
          font-medium
          text-stone-600
        "
      >
        {no}
      </td>





      {/* Gambar */}
      <td className="p-4">

        <div className="flex justify-center">

          <div
            className="
              relative
              h-16
              w-16
              overflow-hidden
              rounded-lg
              border
              bg-stone-100
            "
          >

            <Image
  src={
    item.image &&
    item.image.startsWith("http")
      ? item.image
      : "/images/no-image.png"
  }
  alt={item.title || "Gallery Image"}
  fill
  sizes="64px"
  unoptimized
  className="object-cover"
/>

          </div>

        </div>

      </td>






      {/* Judul */}
      <td className="p-4 text-center">

        <p
          title={item.title}
          className="
            mx-auto
            max-w-[220px]
            truncate
            cursor-help
            font-semibold
            text-stone-800
          "
        >
          {item.title}
        </p>

      </td>






      {/* Kategori */}
      <td
        className="
          p-4
          text-center
          text-stone-600
        "
      >
        {item.category || "-"}
      </td>






      {/* Lokasi */}
      <td
        className="
          p-4
          text-center
          text-stone-600
        "
      >
        {item.location || "-"}
      </td>







      {/* Featured */}
      <td className="p-4 text-center">

        {item.featured ? (

          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-amber-100
              px-2
              py-1
              text-xs
              font-semibold
              text-amber-700
            "
          >

            <Star size={12}/>

            Featured

          </span>


        ) : (

          <span
            className="
              text-xs
              text-stone-400
            "
          >
            -
          </span>

        )}

      </td>







      {/* Aksi */}
      <td className="p-4">

        <div
          className="
            flex
            justify-center
            gap-2
          "
        >

          <button
            onClick={onEdit}
            className="
              rounded-lg
              bg-blue-500
              p-2
              text-white
              transition
              hover:bg-blue-600
            "
          >

            <Pencil size={16}/>

          </button>




          <button
            onClick={onDelete}
            className="
              rounded-lg
              bg-red-500
              p-2
              text-white
              transition
              hover:bg-red-600
            "
          >

            <Trash2 size={16}/>

          </button>


        </div>

      </td>


    </tr>

  );
}