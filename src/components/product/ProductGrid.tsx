import Link from "next/link";

import type { Product } from "@/types/product";
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
    <section className="bg-gray-50 py-16">

      <div className="container mx-auto max-w-7xl px-4">


        {/* HEADER */}
        <div
          className="
            mb-10
            flex
            flex-col
            items-start
            justify-between
            gap-5
            md:flex-row
            md:items-center
          "
        >

          <div className="max-w-3xl">

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
                md:text-4xl
              "
            >
              Koleksi Produk
            </h2>


            <p
              className="
                mt-3
                leading-relaxed
                text-gray-600
              "
            >
              Temukan berbagai pilihan gorden berkualitas untuk rumah,
              kantor, hotel, apartemen, sekolah, dan masjid dengan desain
              elegan sesuai kebutuhan Anda.
            </p>

          </div>



          {/* PRODUCT COUNT */}
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-3
              shadow-sm
              ring-1
              ring-gray-100
            "
          >

            <span
              className="
                text-xl
                font-bold
                text-amber-500
              "
            >
              {products.length}
            </span>


            <span
              className="
                text-sm
                font-medium
                text-gray-500
              "
            >
              Produk
            </span>

          </div>


        </div>




        {/* GRID */}
        {products.length > 0 ? (

          <div
            className="
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {products.map((product, index) => (

              <ProductCard
                key={product.id}
                product={product}
                onOpen={() => onOpen(index)}
              />

            ))}

          </div>


        ) : (


          /* EMPTY STATE */
          <div
            className="
              rounded-3xl
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
              ring-1
              ring-gray-100
            "
          >

            <h3
              className="
                text-2xl
                font-bold
                text-gray-900
              "
            >
              Produk belum tersedia
            </h3>


            <p
              className="
                mt-3
                text-gray-500
              "
            >
              Saat ini belum ada produk yang dapat ditampilkan.
            </p>



            <div className="mt-8">

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-amber-500
                  px-7
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-amber-600
                "
              >
                Kembali ke Beranda
              </Link>

            </div>


          </div>

        )}


      </div>

    </section>
  );
}