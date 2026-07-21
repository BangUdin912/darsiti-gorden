import Container from "@/components/common/Container";
import AdminButton from "@/components/common/AdminButton";
import Logo from "@/components/common/Logo";
import SearchBar from "@/components/common/SearchBar";
import WhatsAppButton from "@/components/common/WhatsappButton";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl">
  <Container>
    <div className="flex h-16 items-center justify-between lg:h-20">

      {/* Logo */}
      <div className="w-64 shrink-0">
        <Logo />
      </div>

      {/* Menu */}
      <div className="hidden flex-1 justify-center px-6 lg:flex">
        <NavbarDesktop />
      </div>

      {/* Right */}
      <div className="hidden shrink-0 items-center gap-2 lg:flex">
        <SearchBar />

        <AdminButton />


      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <NavbarMobile />
      </div>

    </div>
  </Container>
</header>
  );
}