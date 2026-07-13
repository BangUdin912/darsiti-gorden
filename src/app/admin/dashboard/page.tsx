import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import RecentGallery from "@/components/admin/dashboard/RecentGallery";
import RecentMaterial from "@/components/admin/dashboard/RecentMaterial";
import RecentMessage from "@/components/admin/dashboard/RecentMessage";
import RecentProduct from "@/components/admin/dashboard/RecentProduct";

import {
  Package,
  Images,
  Layers,
  MessageSquare,
} from "lucide-react";

import { dashboardService } from "@/lib/dashboardService";

export default async function DashboardPage() {
  const [dashboard, stats] = await Promise.all([
    dashboardService.getDashboard(),
    dashboardService.getStats(),
  ]);

  const {
    products = [],
    gallery = [],
    materials = [],
    messages = [],
  } = dashboard;

  const recentProducts = products.slice(0, 5);
  const recentGallery = gallery.slice(0, 5);
  const recentMaterials = materials.slice(0, 5);
  const recentMessages = messages.slice(0, 5);

  const statItems = [
    {
      id: "product",
      title: "Total Product",
      value: stats.products,
      icon: Package,
    },
    {
      id: "gallery",
      title: "Total Gallery",
      value: stats.gallery,
      icon: Images,
    },
    {
      id: "material",
      title: "Total Material",
      value: stats.materials,
      icon: Layers,
    },
    {
      id: "message",
      title: "Total Message",
      value: stats.messages,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-8 text-white shadow-lg">

        <h1 className="text-3xl font-bold">
          Selamat Datang 👋
        </h1>

        <p className="mt-3 max-w-3xl text-amber-100">
          Kelola produk, material, gallery, testimoni, pesan pelanggan,
          serta seluruh konten website Darsiti Gorden melalui dashboard
          admin.
        </p>

      </section>

      {/* Statistik */}
      <StatsGrid stats={statItems} />

      {/* Product & Gallery */}
      <section className="grid gap-6 lg:grid-cols-2">

        <RecentProduct
          items={recentProducts}
        />

        <RecentGallery
          items={recentGallery}
        />

      </section>

      {/* Material & Message */}
      <section className="grid gap-6 lg:grid-cols-2">

        <RecentMaterial
          items={recentMaterials}
        />

        <RecentMessage
          items={recentMessages}
        />

      </section>

    </div>
  );
}