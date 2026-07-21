import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ImageIcon,
  Tag,
} from "lucide-react";

import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  onOpen: () => void;
}

export default function ProductCard({
  product,
  onOpen,
}: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >

      {/* IMAGE */}
      <button
        type="button"
        onClick={onOpen}
        className="
          relative
          block
          h-80
          w-full
          overflow-hidden
        "
      >

        <Image
          src={product.image}
          alt={product.name}
          fill
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
            via-black/10
            to-transparent
          "
        />


        {/* Category Badge */}
        <div
          className="
            absolute
            left-5
            top-5
            flex
            flex-wrap
            gap-2
          "
        >
          {product.category.map((category) => (
            <span
              key={category}
              className="
                rounded-full
                bg-white/90
                px-4
                py-2
                text-xs
                font-semibold
                text-gray-800
                shadow
                backdrop-blur
              "
            >
              {category}
            </span>
          ))}
        </div>


        {/* Image Icon */}
        <div
          className="
            absolute
            right-5
            top-5
            rounded-full
            bg-black/30
            p-3
            backdrop-blur
          "
        >
          <ImageIcon
            className="
              h-5
              w-5
              text-white
            "
          />
        </div>


        {/* Preview Hover */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <span
            className="
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-gray-900
              shadow-lg
            "
          >
            Preview
          </span>
        </div>

      </button>



      {/* CONTENT */}
      <div className="p-6">


        {/* Category */}
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
          "
        >
          <Tag
            className="
              h-4
              w-4
              text-amber-500
            "
          />

          <span>
            {product.category.join(", ")}
          </span>

        </div>



        {/* Title */}
        <h3
          className="
            mt-3
            text-2xl
            font-bold
            text-gray-900
          "
        >
          {product.name}
        </h3>



        {/* Description */}
        <p
          className="
            mt-3
            line-clamp-3
            text-gray-600
          "
        >
          {product.short_description || product.description}
        </p>



        {/* Price */}
        {product.price && (
          <p
            className="
              mt-4
              text-lg
              font-bold
              text-amber-600
            "
          >
            {formatPrice(product.price)}
          </p>
        )}



        {/* ACTION */}
        <div
          className="
            mt-8
            flex
            items-center
            justify-between
          "
        >

          <button
            type="button"
            onClick={onOpen}
            className="
              rounded-full
              border
              border-amber-500
              px-5
              py-2
              font-semibold
              text-amber-600
              transition
              hover:bg-amber-500
              hover:text-white
            "
          >
            Preview
          </button>


          <Link
            href={`/products/${product.slug}`}
            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-amber-600
              transition-all
              hover:gap-3
            "
          >
            Lihat Detail

            <ArrowRight
              className="
                h-5
                w-5
              "
            />

          </Link>

        </div>

      </div>

    </div>
  );
}