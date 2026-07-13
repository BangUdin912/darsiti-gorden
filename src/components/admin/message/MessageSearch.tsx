"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MessageSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Cari nama atau nomor WA..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border px-4 py-3"
    />
  );
}