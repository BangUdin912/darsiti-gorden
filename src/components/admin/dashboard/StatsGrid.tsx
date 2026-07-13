import { LucideIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";

export interface StatItem {
  id: string;
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  if (!stats?.length) {
    return (
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <p className="text-sm text-stone-400">No statistics available</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <DashboardCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          subtitle={item.subtitle}
        />
      ))}
    </section>
  );
}