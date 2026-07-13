"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Send,
} from "lucide-react";

import { authService } from "@/lib/authService";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword(
        email
      );

      setSuccess(
        "Link reset password berhasil dikirim. Silakan cek email Anda."
      );

      setEmail("");
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
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-stone-800">
          Lupa Password
        </h1>

        <p className="mt-2 text-stone-500">
          Masukkan email admin untuk menerima
          link reset password.
        </p>

      </div>

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
              className="w-full rounded-xl border border-stone-300 py-3 pl-11 pr-4 focus:border-amber-500 focus:outline-none"
            />

          </div>

        </div>

        {error && (
          <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-green-100 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <Send size={18} />

          {loading
            ? "Mengirim..."
            : "Kirim Link Reset"}

        </button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-stone-600 transition hover:text-amber-600"
        >
          <ArrowLeft size={16} />

          Kembali ke Login
        </Link>

      </form>

    </div>
  );
}