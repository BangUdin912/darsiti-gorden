"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

import { profileService } from "@/lib/profileService";

export default function LogoutCard() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    const confirmLogout = confirm(
      "Apakah Anda yakin ingin keluar dari akun?"
    );

    if (!confirmLogout) return;

    try {
      setLoading(true);

      await profileService.logout();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal logout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          Logout
        </h2>

        <p className="mt-2 text-stone-500">
          Keluar dari akun administrator Darsiti Gorden.
        </p>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

        <p className="text-sm leading-7 text-red-700">
          Setelah logout, Anda harus login kembali untuk mengakses
          Dashboard Admin.
        </p>

      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Keluar...
          </>
        ) : (
          <>
            <LogOut size={18} />
            Logout
          </>
        )}
      </button>

    </div>
  );
}