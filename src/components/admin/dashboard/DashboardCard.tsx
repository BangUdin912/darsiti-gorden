import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "bg-amber-500",
  subtitle = "Data terbaru",
  trend = "up",
}: DashboardCardProps) {

  const TrendIcon =
    trend === "up"
      ? TrendingUp
      : trend === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-stone-500";

  return (
    <div className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-stone-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-stone-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} shadow-md transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={30} className="text-white" />
        </div>

      </div>

      <div className={`mt-6 flex items-center gap-2 text-sm ${trendColor}`}>
        <TrendIcon size={16} />
        <span>{subtitle}</span>
      </div>

    </div>
  );
}