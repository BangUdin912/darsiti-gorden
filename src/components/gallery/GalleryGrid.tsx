import Link from "next/link";

import type { GalleryItem } from "@/types/gallery";
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
    <section className="bg-gray-50 py-16">

      <div
        className="
          container
          mx-auto
          max-w-7xl
          px-4
        "
      >


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

          <div>

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
                md:text-4xl
              "
            >
              Hasil Pemasangan
            </h2>


            <p
              className="
                mt-3
                text-gray-600
              "
            >
              Dokumentasi hasil pemasangan Darsiti Gorden
              dengan berbagai konsep interior.
            </p>


          </div>





          {/* TOTAL PROJECT */}
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
              {items.length}
            </span>


            <span
              className="
                text-sm
                font-medium
                text-gray-500
              "
            >
              Project
            </span>


          </div>


        </div>





        {/* GRID */}
        {items.length > 0 ? (

          <div
            className="
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {items.map((item, index) => (

              <GalleryCard
                key={item.id}
                item={item}
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
              Gallery belum tersedia
            </h3>


            <p
              className="
                mt-3
                text-gray-500
              "
            >
              Saat ini belum ada proyek yang ditampilkan.
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