"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import MobileMenu from "./MobileMenu";

export default function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Buka Menu"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-stone-300
            bg-white
            text-stone-700
            shadow-sm
            transition-all
            duration-300
            hover:border-[#8B5E3C]
            hover:bg-[#F8F5F2]
            hover:text-[#6D4C41]
            active:scale-95
          "
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="
          w-[320px]
          border-r
          border-stone-200
          bg-[#F8F5F2]
          p-0
          sm:w-[360px]
        "
      >
        <MobileMenu />
      </SheetContent>
    </Sheet>
  );
}