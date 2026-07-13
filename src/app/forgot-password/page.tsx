"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Mail,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { authService } from "@/lib/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword(email);

      setSuccess(true);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message ||
          "Gagal mengirim email reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-stone-800">
            Lupa Password
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Masukkan email admin untuk menerima link reset password.
          </p>

        </div>

        {success ? (
          <div className="space-y-6 text-center">

            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

            <div>

              <h2 className="text-xl font-semibold text-green-600">
                Email Berhasil Dikirim
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Silakan cek Inbox atau Spam pada email Anda,
                kemudian klik tautan reset password dari Supabase.
              </p>

            </div>

            <Link
              href="/login"
              className="inline-block rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              Kembali ke Login
            </Link>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@email.com"
                  className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-amber-500 focus:outline-none"
                />

              </div>

            </div>

            {error && (
              <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              {loading
                ? "Mengirim..."
                : "Kirim Link Reset Password"}
            </button>

            <div className="text-center">

              <Link
                href="/login"
                className="text-sm text-amber-600 hover:underline"
              >
                ← Kembali ke Login
              </Link>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}