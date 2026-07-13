export function formatPrice(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const number =
    typeof value === "string"
      ? Number(value.replace(/[^\d]/g, ""))
      : value;

  if (isNaN(number)) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}