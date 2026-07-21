import type { Metadata } from "next";
import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/layout/AdminShell";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard | Darsiti Gorden",
  description: "Dashboard Admin Darsiti Gorden",
};

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belum login
  if (!user) {
    redirect("/login");
  }

  // Opsional: hanya admin tertentu
  // if (user.email !== "admin@darsitigorden.com") {
  //   redirect("/login");
  // }

  return <AdminShell>{children}</AdminShell>;
}