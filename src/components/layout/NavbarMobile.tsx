"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "src/components/ui/sheet";

import { navigation } from "src/data/navigation";

export default function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <Menu className="h-7 w-7" />
        </button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="mt-10 flex flex-col gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}