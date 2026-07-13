"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

import { profileService } from "@/lib/profileService";

export default function AvatarUpload() {
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile = await profileService.getProfile();

      if (profile) {
        setAvatar(profile.avatar_url ?? "");
        setFullName(profile.full_name ?? "");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const avatarUrl =
  await profileService.updateAvatar(file);

setAvatar(avatarUrl);

      alert("Foto profil berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      alert("Gagal mengupload foto.");
    } finally {
      setLoading(false);
    }
  }

  const initials =
    fullName
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="text-2xl font-bold">
        Foto Profil
      </h2>

      <p className="mt-2 text-stone-500">
        Upload foto profil administrator.
      </p>

      <div className="mt-8 flex flex-col items-center">

        <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-stone-200 bg-stone-100">

          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-stone-500">
              {initials}
            </div>
          )}

        </div>

        <label
          htmlFor="avatar-upload"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Mengupload...
            </>
          ) : (
            <>
              <Camera size={18} />
              Ganti Foto
            </>
          )}
        </label>

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />

      </div>

    </div>
  );
}