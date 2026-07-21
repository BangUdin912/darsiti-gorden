import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils/formatPrice";
import { productService } from "@/lib/productService";


export default async function FeaturedProducts() {
  const products = await productService.getFeatured(4);

  if (products.length === 0) return null;


  return (
    <section className="bg-white py-24">

      <div className="container mx-auto max-w-7xl px-6">


        {/* HEADER */}
        <div className="mb-14 text-center">

          <h2
            className="
              text-4xl
              font-bold
              tracking-tight
              text-gray-900
              lg:text-5xl
            "
          >
            Produk Unggulan Kami
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-gray-600
            "
          >
            Koleksi gorden pilihan dengan desain modern,
            bahan premium, dan dapat disesuaikan dengan kebutuhan
            ruangan Anda.
          </p>

        </div>




        {/* PRODUCT GRID */}
        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {products.map((item) => (

            <div
              key={item.id}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >


              {/* IMAGE */}
              <Link
                href={`/products/${item.slug}`}
                className="
                  relative
                  block
                  h-72
                  w-full
                  overflow-hidden
                "
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading="lazy"
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />


                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />



                {/* CATEGORY */}
                <div
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    bg-white/90
                    px-4
                    py-1.5
                    text-xs
                    font-semibold
                    text-gray-800
                    shadow
                  "
                >
                  {item.category[0] ?? "Produk"}

                </div>


              </Link>





              {/* CONTENT */}
              <div className="p-5">


                <h3
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  {item.name}
                </h3>



                <p
                  className="
                    mt-2
                    line-clamp-2
                    text-sm
                    text-gray-600
                  "
                >
                  {
                    item.short_description ||
                    "Custom sesuai ukuran dan kebutuhan ruangan Anda."
                  }

                </p>




                {item.price && (

                  <p
                    className="
                      mt-3
                      font-bold
                      text-amber-500
                    "
                  >
                    {formatPrice(item.price)}
                  </p>

                )}




                {/* DETAIL BUTTON */}
                <Link
                  href={`/products/${item.slug}`}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-amber-500
                    transition
                    hover:gap-3
                  "
                >
                  Lihat Detail

                  <span>
                    →
                  </span>

                </Link>


              </div>


            </div>

          ))}


        </div>





        {/* CTA */}
        <div className="mt-16 text-center">

          <Link
            href="/products"
            className="
              inline-flex
              rounded-full
              bg-amber-500
              px-10
              py-4
              font-semibold
              text-white
              shadow-lg
              transition
              duration-300
              hover:scale-105
              hover:bg-amber-600
            "
          >
            Lihat Semua Produk
          </Link>


        </div>


      </div>

    </section>
  );
}