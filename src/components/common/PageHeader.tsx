import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;

  /**
   * Background image
   */
  image?: string;

  /**
   * Overlay opacity
   */
  overlayClassName?: string;

  breadcrumb?: {
    label: string;
    href?: string;
  }[];

  className?: string;
}

export default function PageHeader({
  title,
  description,
  image = "/images/gallery/gordenn2.jpg",
  overlayClassName = "bg-black/60",
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
  `
    relative
    isolate
    overflow-hidden

    min-h-[260px]
    sm:min-h-[300px]
    md:min-h-[330px]
    lg:min-h-[360px]

    flex
    items-center
  `,
  className
)}
    >
      {/* Background */}

      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div
        className={cn(
          "absolute inset-0",
          overlayClassName
        )}
      />

      {/* Decoration */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      <Container>

        <div className="relative z-10 max-w-4xl text-white">

          {/* Breadcrumb */}

          {breadcrumb && (
            <nav
              className="
                mb-8
                inline-flex
                flex-wrap
                items-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-white/10

                px-5
                py-2

                text-sm

                backdrop-blur-md
              "
            >
              <Link
                href="/"
                className="flex items-center gap-2 transition hover:text-amber-300"
              >
                <Home size={16} />

                Beranda
              </Link>

              {breadcrumb.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <ChevronRight size={16} />

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition hover:text-amber-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-white">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Title */}

          <h1
            className="
              text-4xl
              font-bold
              leading-tight

              sm:text-5xl

              lg:text-6xl
            "
          >
            {title}
          </h1>

          {/* Description */}

          {description && (
            <p
              className="
                mt-6
                max-w-3xl

                text-base
                leading-8

                text-stone-200

                sm:text-lg
              "
            >
              {description}
            </p>
          )}

        </div>

      </Container>
    </section>
  );
}