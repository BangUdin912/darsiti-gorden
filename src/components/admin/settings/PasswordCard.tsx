"use client";

import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";

import { profileService } from "@/lib/profileService";

export default function PasswordCard() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!currentPassword.trim()) {
      alert("Masukkan password lama.");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "Password baru minimal 6 karakter."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(
        "Konfirmasi password tidak sama."
      );
      return;
    }

    try {
      setLoading(true);

      await profileService.updatePassword(
        newPassword
      );

      alert(
        "Password berhasil diperbarui."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert(
        "Gagal memperbarui password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Ubah Password
        </h2>

        <p className="mt-2 text-stone-500">
          Gunakan password yang kuat agar akun
          administrator tetap aman.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Password Lama */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">
            <Lock size={18} />
            Password Lama
          </label>

          <div className="relative">

            <input
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-4 pr-12 focus:border-amber-500 focus:outline-none"
              placeholder="Masukkan password lama"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  !showCurrent
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
            >
              {showCurrent ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Password Baru */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">
            <Lock size={18} />
            Password Baru
          </label>

          <div className="relative">

            <input
              type={
                showNew
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-4 pr-12 focus:border-amber-500 focus:outline-none"
              placeholder="Minimal 6 karakter"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
            >
              {showNew ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Konfirmasi */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">
            <Lock size={18} />
            Konfirmasi Password Baru
          </label>

          <div className="relative">

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-4 pr-12 focus:border-amber-500 focus:outline-none"
              placeholder="Ulangi password baru"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={18} />
              Simpan Password
            </>
          )}
        </button>

      </form>

    </div>
  );
}