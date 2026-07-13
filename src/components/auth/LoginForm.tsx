"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";

import { authService } from "@/lib/authService";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

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
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-stone-800">
          Admin Login
        </h1>

        <p className="mt-2 text-stone-500">
          Masuk ke Dashboard Darsiti Gorden
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <div className="relative">

            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              size={18}
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@email.com"
              className="w-full rounded-xl border border-stone-300 py-3 pl-11 pr-4 focus:border-amber-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block font-medium">
            Password
          </label>

          <div className="relative">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              size={18}
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

        {/* Error */}

        {error && (
          <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Forgot Password */}

        <div className="text-right">

          <Link
            href="/forgot-password"
            className="text-sm text-amber-600 hover:underline"
          >
            Lupa Password?
          </Link>

        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <LogIn size={18} />

          {loading
            ? "Masuk..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}