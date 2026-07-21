import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;

  align?: "left" | "center";

  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-14 max-w-3xl",
        align === "center"
          ? "text-center"
          : "text-left",
        className
      )}
    >
      {/* Badge */}

      {badge && (
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-primary/10
            px-4
            py-1.5
            text-sm
            font-semibold
            tracking-wide
            text-primary
          "
        >
          {badge}
        </span>
      )}

      {/* Title */}

      <h2
        className="
          mt-5
          text-3xl
          font-bold
          leading-tight
          text-stone-900

          sm:text-4xl

          lg:text-5xl
        "
      >
        {title}

        {highlight && (
          <span className="text-primary">
            {" "}
            {highlight}
          </span>
        )}
      </h2>

      {/* Description */}

      {description && (
        <p
          className="
            mt-6
            text-base
            leading-8
            text-stone-600

            sm:text-lg
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}