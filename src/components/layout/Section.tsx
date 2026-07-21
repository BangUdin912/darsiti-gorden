import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;

  /**
   * Default = py-20
   */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Background
   */
  background?:
    | "transparent"
    | "white"
    | "stone"
    | "primary"
    | "dark";
}

export default function Section({
  children,
  className,
  spacing = "lg",
  background = "transparent",
}: SectionProps) {
  const spacingClass = {
    none: "",

    sm: "py-10 md:py-12",

    md: "py-14 md:py-16",

    lg: "py-16 md:py-20 lg:py-24",

    xl: "py-24 md:py-28 lg:py-32",
  };

  const backgroundClass = {
    transparent: "",

    white: "bg-white",

    stone: "bg-stone-50",

    primary: "bg-primary text-primary-foreground",

    dark:
      "bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 text-white",
  };

  return (
    <section
      className={cn(
        spacingClass[spacing],
        backgroundClass[background],
        className
      )}
    >
      {children}
    </section>
  );
}