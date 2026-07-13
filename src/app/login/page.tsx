"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { authService } from "@/lib/authService";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    if (!form.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!form.password.trim()) {
      setError("Password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await authService.login(
        form.email,
        form.password
      );

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error(err);

      setError(
        "Email atau password salah."
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
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Masuk ke Dashboard Darsiti Gorden
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
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@email.com"
                className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-amber-500 focus:outline-none"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
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
                placeholder="********"
                className="w-full rounded-xl border py-3 pl-12 pr-12 focus:border-amber-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
              >
                {showPassword ? (
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
          >
            {loading && (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}

            {loading
              ? "Masuk..."
              : "Login"}
          </button>

          <div className="text-center">

            <Link
              href="/forgot-password"
              className="text-sm text-amber-600 hover:underline"
            >
              Lupa Password?
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}