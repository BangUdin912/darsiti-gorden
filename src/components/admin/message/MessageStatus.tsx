"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MessageStatus({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border px-4 py-3"
    >
      <option value="all">Semua Status</option>
      <option value="new">Baru</option>
      <option value="processing">Diproses</option>
      <option value="done">Selesai</option>
    </select>
  );
}