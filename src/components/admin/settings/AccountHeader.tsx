"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, UserCircle2 } from "lucide-react";

import { profileService } from "@/lib/profileService";
import type { Profile } from "@/types/profile";

export default function AccountHeader() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      setLoading(true);

      const user = await profileService.getUser();
      const profileData = await profileService.getProfile();

      if (user) {
        setEmail(user.email ?? "");
      }

      setProfile(profileData);
    } catch (error) {
      console.error("Load Profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 rounded-3xl bg-white p-8 shadow">
        <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
        <span className="text-stone-600">
          Memuat informasi akun...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow md:flex-row">
      {/* Avatar */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-amber-100 bg-stone-100">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Avatar Admin"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UserCircle2
              size={72}
              className="text-stone-400"
            />
          </div>
        )}
      </div>

      {/* Informasi */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-sm uppercase tracking-wider text-amber-600">
          Administrator
        </p>

        <h1 className="mt-2 text-3xl font-bold text-stone-800">
          {profile?.full_name || "Admin"}
        </h1>

        <p className="mt-2 text-stone-500">
          {email}
        </p>

        <p className="mt-4 text-sm text-stone-500">
          Kelola informasi akun administrator, ubah foto profil,
          email, password, dan pengaturan akun melalui halaman ini.
        </p>
      </div>
    </div>
  );
}