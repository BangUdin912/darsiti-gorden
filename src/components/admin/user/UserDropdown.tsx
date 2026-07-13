"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { profileService } from "@/lib/profileService";
import type { Profile } from "@/types/profile";

export default function UserDropdown() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [email, setEmail] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function loadUser() {
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
    try {
      await profileService.logout();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Logout gagal.");
    }
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DG";

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-2 transition hover:bg-stone-100"
      >
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Avatar"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
            {initials}
          </div>
        )}

        <div className="hidden text-left md:block">
          <p className="font-semibold text-stone-900">
            {profile?.full_name ||
              "Administrator"}
          </p>

          <p className="text-xs text-stone-500">
            {email}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
          {/* Profile */}
          <div className="border-b p-5">
            <p className="font-semibold">
              {profile?.full_name ||
                "Administrator"}
            </p>

            <p className="text-sm text-stone-500">
              {email}
            </p>
          </div>

          {/* Menu */}
          <Link
            href="/admin/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-4 transition hover:bg-stone-50"
          >
            <User size={18} />

            Profil Saya
          </Link>

          <Link
            href="/admin/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-4 transition hover:bg-stone-50"
          >
            <Settings size={18} />

            Pengaturan
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      )}
    </div>
  );
}