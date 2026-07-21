"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  ArrowRight,
  Palette,
  Star,
} from "lucide-react";

import type { Material } from "@/types/material";


interface MaterialCardProps {
  material: Material;
  onPreview: () => void;
}


export default function MaterialCard({
  material,
  onPreview,
}: MaterialCardProps) {

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-amber-400
        hover:shadow-xl
      "
    >


      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[4/3]
          overflow-hidden
          bg-gray-100
        "
      >

        <Image
          src={material.image || "/images/no-image.png"}
          alt={material.name}
          fill
          unoptimized
          className="
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />



        {/* OVERLAY PREVIEW */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/0
            transition
            duration-300
            group-hover:bg-black/40
          "
        >

          <button
            onClick={onPreview}
            className="
              flex
              translate-y-4
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              font-semibold
              text-gray-900
              opacity-0
              shadow-lg
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <Eye size={18} />

            Preview

          </button>

        </div>





        {/* CATEGORY */}
        <div className="absolute left-4 top-4">

          <span
            className="
              rounded-full
              bg-gray-900/80
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              backdrop-blur
            "
          >
            {material.category}
          </span>

        </div>





        {/* FEATURED */}
        {material.featured && (

          <div className="absolute right-4 top-4">

            <span
              className="
                flex
                items-center
                gap-1
                rounded-full
                bg-amber-500
                px-3
                py-1
                text-xs
                font-semibold
                text-white
                shadow
              "
            >

              <Star
                size={12}
                fill="currentColor"
              />

              Featured

            </span>

          </div>

        )}


      </div>





      {/* CONTENT */}
      <div
        className="
          flex
          flex-1
          flex-col
          p-6
        "
      >


        {/* TITLE */}
        <h3
          className="
            line-clamp-2
            text-xl
            font-bold
            text-gray-900
            transition
            group-hover:text-amber-500
          "
        >
          {material.name}
        </h3>




        {/* DESCRIPTION */}
        {material.description && (

          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              leading-6
              text-gray-600
            "
          >
            {material.description}
          </p>

        )}






        {/* INFO */}
        <div className="mt-5 space-y-3">


          {material.color && (

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >

              <Palette
                size={16}
                className="text-amber-500"
              />

              {material.color}

            </div>

          )}





          {material.feature && (

            <div
              className="
                rounded-xl
                bg-gray-100
                px-3
                py-2
                text-sm
                text-gray-700
                line-clamp-2
              "
            >
              {material.feature}
            </div>

          )}


        </div>





        {/* PRICE */}
        <div className="mt-6">


          {material.price ? (

            <p
              className="
                text-xl
                font-bold
                text-amber-500
              "
            >
              Rp{" "}
              {material.price.toLocaleString("id-ID")}

            </p>

          ) : (

            <p
              className="
                text-sm
                text-gray-400
              "
            >
              Hubungi untuk harga
            </p>

          )}


        </div>







        {/* ACTION */}
        <div
          className="
            mt-auto
            flex
            gap-3
            pt-6
          "
        >


          {/* PREVIEW */}
          <button
            onClick={onPreview}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-300
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:border-amber-500
              hover:bg-amber-50
              hover:text-amber-600
            "
          >

            <Eye size={18} />

            Preview

          </button>






          {/* DETAIL */}
<Link
  href={`/material/${material.slug}`}
  className="
    flex
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-amber-500
    py-3
    text-sm
    font-semibold
    text-white
    transition
    hover:bg-amber-600
  "
>
  Lihat Detail

  <ArrowRight size={18} />

</Link>


        </div>



      </div>


    </div>
  );
}