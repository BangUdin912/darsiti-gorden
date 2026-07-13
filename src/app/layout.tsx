import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gordenmurahpurwokerto.store"),

  title: {
    default: "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",
    template: "%s | Darsiti Gorden",
  },

  description:
    "Darsiti Gorden melayani pembuatan dan pemasangan gorden custom untuk rumah, kantor, hotel, masjid, apartemen, dan berbagai kebutuhan interior di Purwokerto dan sekitarnya.",

  keywords: [
    "Gorden Purwokerto",
    "Gorden Custom",
    "Gorden Minimalis",
    "Blackout",
    "Vitrase",
    "Roller Blind",
    "Vertical Blind",
    "Roman Blind",
    "Gorden Hotel",
    "Gorden Kantor",
    "Gorden Rumah",
  ],

  authors: [{ name: "Darsiti Gorden" }],
  creator: "Darsiti Gorden",
  publisher: "Darsiti Gorden",

  openGraph: {
    title: "Darsiti Gorden | Spesialis Gorden Custom",
    description:
      "Spesialis gorden custom premium untuk rumah, kantor, hotel, dan masjid.",
    url: "https://www.gordenmurahpurwokerto.store",
    siteName: "Darsiti Gorden",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Darsiti Gorden",
    description:
      "Spesialis gorden custom premium untuk rumah, kantor, hotel, dan masjid.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">

        {/* GLOBAL BRAND */}
        <AnnouncementBar />
        <Navbar />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* GLOBAL CONVERSION LAYER */}
        <WhatsAppFloat />

        {/* UTILITY */}
        <ScrollToTop />

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}