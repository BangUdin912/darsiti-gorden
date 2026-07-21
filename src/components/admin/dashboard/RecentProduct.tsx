import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";


interface Props {
  items: Product[];
}


export default function RecentProduct({
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
            Product Terbaru
          </h2>


          <p
            className="
              mt-1
              text-sm
              text-stone-500
            "
          >
            Produk terbaru yang ditambahkan
          </p>

        </div>


        <Link
          href="/admin/product"
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
            Belum ada produk.
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
                    "Product"
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



              {/* Detail */}
              <div
                className="
                  min-w-0
                  flex-1
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



                {/* Category */}
                <div
                  className="
                    mt-2
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {item.category?.length ? (

                    item.category
                      .slice(0,2)
                      .map((category)=>(
                        <span
                          key={category}
                          className="
                            rounded-full
                            bg-amber-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-amber-700
                          "
                        >
                          {category}
                        </span>
                      ))

                  ) : (

                    <span
                      className="
                        rounded-full
                        bg-stone-100
                        px-3
                        py-1
                        text-xs
                        text-stone-500
                      "
                    >
                      Uncategorized
                    </span>

                  )}

                </div>



                {/* Price */}
                <p
                  className="
                    mt-3
                    font-bold
                    text-amber-600
                  "
                >
                  {formatPrice(item.price)}
                </p>


              </div>



              {/* Action */}
              <Link
                href={`/admin/product/edit/${item.id}`}
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