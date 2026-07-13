"use client";

interface Props {
  categories: string[];
  selected: string;
  counts: Record<string, number>;
  onChange: (category: string) => void;
}

export default function ProductFilter({
  categories,
  selected,
  counts,
  onChange,
}: Props) {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="container mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-6 scrollbar-hide">

        {/* Semua */}
        <button
          type="button"
          onClick={() => onChange("Semua")}
          className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
            selected === "Semua"
              ? "border-stone-900 bg-stone-900 text-white shadow-md"
              : "border-stone-200 bg-white text-stone-700 hover:border-amber-500 hover:text-amber-600"
          }`}
        >
          Semua

          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              selected === "Semua"
                ? "bg-white/20 text-white"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {counts.Semua ?? 0}
          </span>
        </button>

        {/* Kategori */}
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
              selected === category
                ? "border-stone-900 bg-stone-900 text-white shadow-md"
                : "border-stone-200 bg-white text-stone-700 hover:border-amber-500 hover:text-amber-600"
            }`}
          >
            {category}

            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                selected === category
                  ? "bg-white/20 text-white"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {counts[category] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}