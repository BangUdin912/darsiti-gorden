"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  CheckCircle2,
} from "lucide-react";

import { authService } from "@/lib/authService";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      await authService.updatePassword(password);

      setSuccess(true);

      setTimeout(() => {
        router.replace("/login");
      }, 2500);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message || "Gagal mengubah password."
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
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Masukkan password baru Anda.
          </p>

        </div>

        {success ? (
          <div className="space-y-6 text-center">

            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

            <div>

              <h2 className="text-xl font-semibold text-green-600">
                Password Berhasil Diubah
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Anda akan diarahkan ke halaman login...
              </p>

            </div>

            <Link
              href="/login"
              className="inline-block rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
            >
              Login
            </Link>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block font-medium">
                Password Baru
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Password Baru"
                  className="w-full rounded-xl border py-3 pl-12 pr-12 focus:border-amber-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Konfirmasi Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Konfirmasi Password"
                  className="w-full rounded-xl border py-3 pl-12 pr-12 focus:border-amber-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {error && (
              <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              {loading
                ? "Menyimpan..."
                : "Simpan Password"}
            </button>

            <div className="text-center">

              <Link
                href="/login"
                className="text-sm text-amber-600 hover:underline"
              >
                Kembali ke Login
              </Link>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}