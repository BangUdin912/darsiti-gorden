"use client";

import { useEffect, useState } from "react";
import { Mail, User, Save, Loader2 } from "lucide-react";

import { profileService } from "@/lib/profileService";

export default function ProfileCard() {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  async function loadProfile() {
    try {
      setLoadingData(true);

      const user = await profileService.getUser();
      const profile = await profileService.getProfile();

      setEmail(user?.email ?? "");
      setFullName(profile?.full_name ?? "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      // Update nama
      await profileService.updateProfile({
        full_name: fullName,
      });

      // Update email
      const user = await profileService.getUser();

      if (user?.email !== email) {
        await profileService.updateEmail(email);
      }

      alert("Profil berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          Memuat profil...
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Informasi Profil
        </h2>

        <p className="mt-2 text-stone-500">
          Perbarui nama lengkap dan email administrator.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Nama */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">
            <User size={18} />
            Nama Lengkap
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
            placeholder="Nama Lengkap"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
            placeholder="Email"
          />

          <p className="mt-2 text-sm text-stone-500">
            Jika email diubah, Supabase akan mengirim email
            konfirmasi ke alamat email baru.
          </p>

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
              Simpan Perubahan
            </>
          )}
        </button>

      </form>

    </div>
  );
}