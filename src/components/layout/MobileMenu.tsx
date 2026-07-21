"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Package,
  Layers3,
  Images,
  Info,
  Phone,
  ChevronRight,
} from "lucide-react";

import {
  SheetClose,
} from "@/components/ui/sheet";

import Logo from "@/components/common/Logo";
import SearchBar from "@/components/common/SearchBar";
import AdminButton from "@/components/common/AdminButton";
import WhatsAppButton from "@/components/common/WhatsappButton";

const menus = [
  {
    title: "Beranda",
    href: "/",
    icon: Home,
  },
  {
    title: "Produk",
    href: "/products",
    icon: Package,
  },
  {
    title: "Material",
    href: "/material",
    icon: Layers3,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: Images,
  },
  {
    title: "Tentang",
    href: "/about",
    icon: Info,
  },
  {
    title: "Kontak",
    href: "/contact",
    icon: Phone,
  },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-[#F8F5F2]">

      {/* Header */}

      <div className="bg-primary px-6 py-8 text-primary-foreground">

        <Logo />


      </div>

      {/* Search */}

      <div className="border-b bg-white p-5">
        <SearchBar />
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto p-5">

        <div className="rounded-3xl bg-white p-3 shadow-sm">

          {menus.map((menu) => {

            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <SheetClose
                asChild
                key={menu.href}
              >
                <Link
                  href={menu.href}
                  className={`
                    mb-2
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-4
                    transition-all
                    duration-300

                    ${active
                      ? "bg-[#6D4C41] text-white shadow-md"
                      : "text-stone-700 hover:bg-[#F8F5F2]"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl

                        ${active
                          ? "bg-white/20"
                          : "bg-[#F5ECE7]"
                        }
                      `}
                    >
                      <Icon
                        className={`
                          h-5
                          w-5

                          ${active
                            ? "text-white"
                            : "text-[#6D4C41]"
                          }
                        `}
                      />
                    </div>

                    <span className="font-medium">
                      {menu.title}
                    </span>

                  </div>

                  <ChevronRight
                    className={`
                      h-5
                      w-5

                      ${active
                        ? "text-white"
                        : "text-stone-400"
                      }
                    `}
                  />

                </Link>
              </SheetClose>
            );

          })}

        </div>

      </div>

      {/* Bottom */}

      <div className="space-y-3 border-t bg-white p-5">

        <WhatsAppButton />

        <AdminButton />

      </div>

      {/* Footer */}

      <div className="border-t bg-stone-100 px-6 py-4 text-center">

        <p className="text-xs text-stone-500">
          © {new Date().getFullYear()} Darsiti Gorden
        </p>

        <p className="mt-1 text-xs text-stone-400">
          Curtain • Interior • Custom Design
        </p>

      </div>

    </div>
  );
}