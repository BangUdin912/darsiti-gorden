"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Images,
  Layers3,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { profileService } from "@/lib/profileService";
import type { Profile } from "@/types/profile";

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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

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
    const ok = confirm(
      "Yakin ingin logout?"
    );

    if (!ok) return;

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
      .map((item) => item[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DG";

  return (
    <aside className="hidden w-72 shrink-0 border-r border-stone-200 bg-white lg:flex lg:flex-col">

      {/* Logo */}
      <div className="border-b border-stone-200 p-8">
        <Link href="/admin/dashboard">

          <div className="flex items-center gap-4">

            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-14 w-14 rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-xl font-bold text-white shadow-lg">
                {initials}
              </div>
            )}

            <div>
              <h1 className="text-xl font-bold text-stone-900">
                {profile?.full_name ||
                  "Darsiti Gorden"}
              </h1>

              <p className="text-sm text-stone-500">
                {email || "Administrator"}
              </p>
            </div>

          </div>

        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-6">

        {menus.map((menu) => {
          const Icon = menu.icon;

          const active = isActive(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-stone-600 hover:bg-amber-50 hover:text-amber-600"
              }`}
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-stone-200 p-6">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}