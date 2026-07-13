"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

import { authService } from "@/lib/authService";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.password.trim()) {
      setError("Password baru wajib diisi.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      await authService.updatePassword(
        form.password
      );

      setSuccess(
        "Password berhasil diubah. Anda akan diarahkan ke halaman login."
      );

      setTimeout(() => {
        router.replace("/login");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message ??
          "Gagal mengubah password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-stone-800">
          Reset Password
        </h1>

        <p className="mt-2 text-stone-500">
          Masukkan password baru untuk akun
          admin.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Password */}

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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password baru"
              className="w-full rounded-xl border border-stone-300 py-3 pl-11 pr-12 focus:border-amber-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Konfirmasi Password */}

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
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password baru"
              className="w-full rounded-xl border border-stone-300 py-3 pl-11 pr-12 focus:border-amber-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="flex items-center gap-2 rounded-xl bg-green-100 p-3 text-sm text-green-700">
            <CheckCircle size={18} />

            {success}
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : "Simpan Password Baru"}
        </button>

      </form>

    </div>
  );
}