import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;

  /**
   * Jumlah kolom desktop
   */
  cols?: 1 | 2 | 3 | 4 | 5;

  /**
   * Gap antar card
   */
  gap?: "sm" | "md" | "lg";
}

export default function ResponsiveGrid({
  children,
  className,
  cols = 3,
  gap = "lg",
}: ResponsiveGridProps) {
  const gapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const colClass = {
    1: `
      grid-cols-1
    `,

    2: `
      grid-cols-1
      sm:grid-cols-2
    `,

    3: `
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
    `,

    4: `
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      2xl:grid-cols-4
    `,

    5: `
      grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
    `,
  };

  return (
    <div
      className={cn(
        "grid",
        gapClass[gap],
        colClass[cols],
        className
      )}
    >
      {children}
    </div>
  );
}