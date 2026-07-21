"use client";

import Image from "next/image";
import Link from "next/link";

import type { Material } from "@/types/material";


interface Props {
  items: Material[];
}


export default function RecentMaterial({
  items,
}: Props) {

  const recent = items ?? [];


  return (
    <div
      className="
        rounded-3xl
        border
        border-stone-200
        bg-white
        p-6
        shadow-md
        transition
        hover:shadow-lg
      "
    >

      {/* Header */}
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-stone-900
            "
          >
            Material Terbaru
          </h2>


          <p
            className="
              mt-1
              text-sm
              text-stone-500
            "
          >
            Material terbaru untuk katalog gorden
          </p>

        </div>



        <Link
          href="/admin/material"
          className="
            rounded-xl
            bg-amber-50
            px-4
            py-2
            text-sm
            font-semibold
            text-amber-600
            transition
            hover:bg-amber-100
          "
        >
          Lihat Semua
        </Link>


      </div>



      {recent.length === 0 ? (

        <div
          className="
            flex
            h-56
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-stone-200
            bg-stone-50
          "
        >

          <p
            className="
              text-stone-400
            "
          >
            Belum ada material.
          </p>


        </div>


      ) : (


        <div
          className="
            space-y-4
          "
        >


          {recent.map((item) => (

            <div
              key={item.id}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-stone-200
                bg-stone-50
                p-4
                transition-all
                duration-200
                hover:border-amber-300
                hover:bg-white
                hover:shadow-md
              "
            >


              {/* Image */}
              <div
                className="
                  relative
                  h-24
                  w-24
                  shrink-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-stone-200
                  bg-white
                "
              >

                <Image
                  src={
                    item.image ||
                    "/images/no-image.png"
                  }
                  alt={
                    item.name ||
                    "Material"
                  }
                  fill
                  unoptimized
                  className="
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

              </div>



              {/* Content */}
              <div
                className="
                  min-w-0
                  flex-1
                "
              >


                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <h3
                    className="
                      truncate
                      text-base
                      font-bold
                      text-stone-900
                    "
                  >
                    {item.name}
                  </h3>


                  {item.featured && (

                    <span
                      className="
                        shrink-0
                        rounded-full
                        bg-amber-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-amber-700
                      "
                    >
                      Featured
                    </span>

                  )}

                </div>




                {/* Category */}
                {item.category && (

                  <div
                    className="
                      mt-2
                    "
                  >

                    <span
                      className="
                        rounded-full
                        bg-stone-200
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-stone-600
                      "
                    >
                      {item.category}
                    </span>

                  </div>

                )}




                {/* Description */}
                {item.description && (

                  <p
                    className="
                      mt-3
                      line-clamp-1
                      text-sm
                      text-stone-500
                    "
                  >
                    {item.description}
                  </p>

                )}



              </div>




              {/* Button */}
              <Link
                href={`/admin/material/edit/${item.id}`}
                className="
                  rounded-xl
                  border
                  border-stone-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-stone-600
                  transition
                  hover:border-amber-400
                  hover:bg-amber-50
                  hover:text-amber-700
                "
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