import type { Metadata } from "next";
import { redirect } from "next/navigation";

import Sidebar from "@/components/admin/layout/Sidebar";
import Header from "@/components/admin/layout/Header";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard | Darsiti Gorden",
  description: "Dashboard Admin Darsiti Gorden",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belum login
  if (!user) {
    redirect("/login");
  }

  // (Opsional) Hanya email tertentu yang boleh menjadi admin
  // if (user.email !== "admin@darsitigorden.com") {
  //   redirect("/login");
  // }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex min-h-screen flex-1 flex-col">

          {/* Header */}
          <Header />

          {/* Main */}
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}