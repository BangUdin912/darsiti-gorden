"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import SearchBar from "@/components/common/SearchBar";
import NotificationBell from "@/components/admin/notification/NotificationBell";
import UserDropdown from "@/components/admin/user/UserDropdown";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const pathname = usePathname();

  const title = getTitle(pathname);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-stone-200
        bg-white/95
        backdrop-blur
      "
    >
      <div
        className="
          flex
          h-16
          items-center
          justify-between
          gap-4
          px-4
          sm:h-20
          sm:px-6
          lg:px-8
        "
      >
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-stone-200
              bg-white
              transition
              hover:border-amber-400
              hover:bg-amber-50
              lg:hidden
            "
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">

            <h1
              className="
                truncate
                text-xl
                font-bold
                text-stone-900
                lg:text-2xl
              "
            >
              {title}
            </h1>

            <p
              className="
                hidden
                text-sm
                text-stone-500
                sm:block
              "
            >
              Selamat datang di Dashboard Darsiti Gorden
            </p>

          </div>

        </div>

        

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">

          {/* Search */}
<div
  className="
    hidden
    w-64
    lg:block
    xl:w-80
  "
>

</div>

          <NotificationBell />

          <UserDropdown />

        </div>
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