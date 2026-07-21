"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items?: {
    label: string;
    href?: string;
  }[];
}

const pathMap: Record<string, string> = {
  products: "Produk",
  material: "Material",
  gallery: "Galeri",
  about: "Tentang",
  contact: "Kontak",
  admin: "Admin",
  dashboard: "Dashboard",
  messages: "Pesan",
  settings: "Pengaturan",
};

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  const pathname = usePathname();

  const breadcrumbs =
    items ??
    pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        label:
          pathMap[segment] ??
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        href:
          index === array.length - 1
            ? undefined
            : "/" + array.slice(0, index + 1).join("/"),
      }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm"
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-stone-500 transition hover:text-primary"
      >
        <Home size={16} />
        Beranda
      </Link>

      {breadcrumbs.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <ChevronRight
            size={16}
            className="text-stone-400"
          />

          {item.href ? (
            <Link
              href={item.href}
              className="text-stone-500 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-primary">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}