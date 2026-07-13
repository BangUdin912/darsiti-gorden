import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      <Image
        src="/images/logo/logo.png"
        alt="Logo Darsiti Gorden"
        width={48}
        height={48}
        className="h-12 w-12 rounded-full object-cover"
        priority
      />

      <div>
        <h1 className="font-heading text-xl font-bold">
          Darsiti Gorden
        </h1>

        <p className="text-xs text-muted-foreground">
          Custom Curtain Interior
        </p>
      </div>
    </Link>
  );
}