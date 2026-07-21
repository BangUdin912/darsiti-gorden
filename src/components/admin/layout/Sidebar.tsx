"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Images,
  Layers3,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { profileService } from "@/lib/profileService";
import type { Profile } from "@/types/profile";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    href: "/admin/product",
    icon: Package,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Material",
    href: "/admin/material",
    icon: Layers3,
  },
  {
    title: "Pesan",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Setting",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  // otomatis menutup sidebar saat pindah halaman (mobile)
  useEffect(() => {
    onClose();
  }, [pathname]);

  async function loadProfile() {
    try {
      const [profileData, user] =
        await Promise.all([
          profileService.getProfile(),
          profileService.getUser(),
        ]);

      setProfile(profileData);
      setEmail(user?.email ?? "");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogout() {
    if (!confirm("Yakin ingin logout?")) return;

    try {
      await profileService.logout();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Logout gagal.");
    }
  }

  function isActive(href: string) {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(href + "/")
    );
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((v) => v[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DG";

  return (
    <>
      {/* Overlay Mobile */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/50
          transition-opacity
          duration-300
          lg:hidden
          ${
            open
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      {/* Sidebar */}
<aside
  className={`
    z-50
    flex
    w-72
    flex-col
    border-r
    border-stone-200
    bg-white
    shadow-xl
    transition-transform
    duration-300
    ease-in-out


    fixed
    left-0
    top-0
    h-screen

    ${
      open
        ? "translate-x-0"
        : "-translate-x-full"
    }


    lg:sticky
    lg:top-[88px]
    lg:h-[calc(100vh-88px)]
    lg:translate-x-0
    lg:shadow-none
  `}
>
        {/* Header */}
        <div className="border-b border-stone-200 p-6">

          {/* Mobile Close */}
          <div className="mb-5 flex items-center justify-between lg:hidden">

            <h2 className="font-semibold">
              Menu
            </h2>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-stone-100"
            >
              <X size={20} />
            </button>

          </div>

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-4"
          >
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={56}
                height={56}
                unoptimized
                className="rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-lg font-bold text-white">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="truncate font-bold text-stone-900">
                {profile?.full_name ??
                  "Darsiti Gorden"}
              </h1>

              <p className="truncate text-sm text-stone-500">
                {email || "Administrator"}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
<nav
  className="
    flex-1
    overflow-y-auto
    px-5
    py-6
    scrollbar-thin
  "
>
  <div className="space-y-2">
    {menus.map((menu) => {
      const Icon = menu.icon;

      const active =
        isActive(menu.href);

      return (
        <Link
          key={menu.href}
          href={menu.href}
          className={`
            flex
            items-center
            gap-4
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            transition-all
            duration-200

            ${
              active
                ? "bg-amber-500 text-white shadow-md"
                : "text-stone-600 hover:bg-amber-50 hover:text-amber-600"
            }
          `}
        >
          <Icon size={20} />

          <span>
            {menu.title}
          </span>
        </Link>
      );
    })}
  </div>
</nav>

        {/* Footer */}
<div
  className="
    shrink-0
    border-t
    border-stone-200
    bg-white
    p-5
  "
>
  <button
    onClick={handleLogout}
    className="
      flex
      w-full
      items-center
      gap-4
      rounded-xl
      px-4
      py-3
      text-sm
      font-medium
      text-red-500
      transition
      hover:bg-red-50
    "
  >
    <LogOut size={20} />

    Logout
  </button>
</div>
      </aside>
    </>
  );
}