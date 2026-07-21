"use client";

import Image from "next/image";

import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Tag,
} from "lucide-react";

import type { GalleryItem } from "@/types/gallery";


interface Props {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}


export default function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: Props) {


  if (!isOpen) return null;


  const item = items[currentIndex];


  if (!item) return null;



  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/90
        backdrop-blur-sm
        overflow-y-auto
        p-4
      "
    >



      {/* CLOSE */}
      <button
        onClick={onClose}
        className="
          fixed
          right-4
          top-4
          z-50
          rounded-full
          bg-white/20
          p-2.5
          text-white
          transition
          hover:bg-white/30
          sm:right-6
          sm:top-6
          sm:p-3
        "
      >
        <X
          size={22}
        />
      </button>





      {/* PREVIOUS */}
      <button
        onClick={onPrev}
        className="
          fixed
          left-3
          top-1/2
          z-40
          -translate-y-1/2
          rounded-full
          bg-white/20
          p-2
          text-white
          transition
          hover:bg-white/30
          sm:left-6
          sm:p-3
        "
      >

        <ChevronLeft
          size={24}
        />

      </button>






      {/* NEXT */}
      <button
        onClick={onNext}
        className="
          fixed
          right-3
          top-1/2
          z-40
          -translate-y-1/2
          rounded-full
          bg-white/20
          p-2
          text-white
          transition
          hover:bg-white/30
          sm:right-6
          sm:p-3
        "
      >

        <ChevronRight
          size={24}
        />

      </button>






      {/* CONTENT */}
      <div
        className="
          flex
          w-full
          max-w-7xl
          flex-col
          gap-5
          lg:flex-row
          lg:gap-8
        "
      >




        {/* IMAGE */}
<div
  className="
    relative
    h-[320px]
    w-full
    overflow-hidden
    rounded-3xl
    bg-black
    sm:h-[500px]
    lg:h-[700px]
    lg:flex-[2]
  "
>

  <Image
  src={item.image || "/images/placeholder.jpg"}
  alt={item.title}
  fill
  unoptimized
  priority
  className="object-contain"
  sizes="100vw"
/>

</div>







        {/* INFORMATION */}
        <div
          className="
            w-full
            max-h-[45vh]
            overflow-y-auto
            rounded-3xl
            bg-white
            p-5
            sm:p-8
            lg:max-h-[700px]
            lg:max-w-md
          "
        >



          {/* CATEGORY */}
          <span
            className="
              inline-flex
              rounded-full
              bg-amber-100
              px-4
              py-2
              text-sm
              font-semibold
              text-amber-600
            "
          >
            {item.category}
          </span>





          {/* TITLE */}
          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-gray-900
              sm:text-3xl
            "
          >
            {item.title}
          </h2>





          {/* META */}
          <div
            className="
              mt-6
              space-y-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-700
              "
            >

              <Tag
                size={18}
                className="text-amber-500"
              />

              <span>
                {item.category}
              </span>

            </div>




            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-700
              "
            >

              <MapPin
                size={18}
                className="text-red-500"
              />

              <span>
                {item.location}
              </span>

            </div>


          </div>







          {/* DESCRIPTION */}
          <div
            className="
              mt-8
              border-t
              border-gray-200
              pt-6
            "
          >

            <h3
              className="
                mb-3
                text-lg
                font-semibold
                text-gray-900
              "
            >
              Deskripsi
            </h3>


            <p
              className="
                text-sm
                leading-7
                text-gray-600
                sm:text-base
              "
            >
              {item.description}
            </p>


          </div>







          {/* COUNTER */}
          <div
            className="
              mt-8
              rounded-2xl
              bg-gray-100
              p-4
            "
          >

            <p
              className="
                text-sm
                text-gray-600
              "
            >
              Foto {currentIndex + 1} dari {items.length}
            </p>


          </div>



        </div>



      </div>


    </div>
  );
}