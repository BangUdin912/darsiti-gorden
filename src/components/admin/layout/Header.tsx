"use client";

import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import NotificationBell from "@/components/admin/notification/NotificationBell";
import UserDropdown from "@/components/admin/user/UserDropdown";

export default function Header() {
  const pathname = usePathname();

  const title = getTitle(pathname);

  return (
    <header
      className="
        sticky top-0 z-40 
        flex h-20 items-center justify-between
        border-b border-stone-200
        bg-white px-8
      "
    >
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-stone-500">
          Selamat datang di Dashboard Darsiti Gorden
        </p>
      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-5">


        {/* Search */}
        <div
          className="
            hidden lg:flex
            items-center
            rounded-xl
            border border-stone-200
            bg-stone-50
            px-4
          "
        >
          <Search
            size={18}
            className="text-stone-400"
          />

          <input
            type="text"
            placeholder="Cari..."
            className="
              w-56
              bg-transparent
              px-3 py-3
              text-sm
              outline-none
            "
          />
        </div>


        {/* Notification */}
        <NotificationBell />


        {/* User */}
        <UserDropdown />


      </div>
    </header>
  );
}


/**
 * Dynamic Header Title
 */
function getTitle(pathname: string) {

  const menus = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
    },
    {
      path: "/admin/product",
      title: "Product",
    },
    {
      path: "/admin/gallery",
      title: "Gallery",
    },
    {
      path: "/admin/material",
      title: "Material",
    },
    {
      path: "/admin/messages",
      title: "Pesan",
    },
    {
      path: "/admin/settings",
      title: "Setting",
    },
  ];


  const menu = menus.find((item) =>
    pathname.startsWith(item.path)
  );


  return menu?.title ?? "Admin Panel";
}