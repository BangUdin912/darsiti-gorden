"use client";

interface Props {
  onDelete: () => void;
}

export default function MessageDelete({
  onDelete,
}: Props) {
  return (
    <button
      onClick={onDelete}
      className="rounded-xl bg-red-600 px-5 py-3 text-white"
    >
      Hapus Pesan
    </button>
  );
}