import Link from "next/link";
import { navigation } from "src/data/navigation";

export default function NavbarDesktop() {
  return (
    <nav className="flex items-center justify-center gap-10">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}