import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;

  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "outline"
    | "white";

  size?: "sm" | "md" | "lg";

  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        `
          inline-flex
          items-center
          justify-center
          rounded-full
          font-semibold
          transition-all
          duration-300
          whitespace-nowrap
        `,

        /* Size */
        size === "sm" &&
          "px-3 py-1 text-xs",

        size === "md" &&
          "px-4 py-2 text-sm",

        size === "lg" &&
          "px-5 py-2.5 text-base",

        /* Variant */
        variant === "primary" &&
          `
            bg-primary/10
            text-primary
            border
            border-primary/20
          `,

        variant === "secondary" &&
          `
            bg-stone-100
            text-stone-700
            border
            border-stone-200
          `,

        variant === "success" &&
          `
            bg-green-100
            text-green-700
            border
            border-green-200
          `,

        variant === "warning" &&
          `
            bg-amber-100
            text-amber-700
            border
            border-amber-200
          `,

        variant === "outline" &&
          `
            border
            border-primary
            text-primary
            bg-transparent
          `,

        variant === "white" &&
          `
            bg-white/20
            border
            border-white/30
            text-white
            backdrop-blur
          `,

        className
      )}
    >
      {children}
    </span>
  );
}