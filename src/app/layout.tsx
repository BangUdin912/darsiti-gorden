import type {
  Metadata,
  Viewport,
} from "next";
import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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
  metadataBase: new URL(
    "https://www.gordenmurahpurwokerto.store"
  ),

  title: {
    default:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",
    template: "%s | Darsiti Gorden",
  },

  description:
    "Darsiti Gorden melayani pembuatan dan pemasangan gorden custom untuk rumah, kantor, hotel, masjid, apartemen, villa, cafe, dan berbagai kebutuhan interior di Purwokerto dan sekitarnya.",

  keywords: [
    "gorden purwokerto",
    "gorden murah purwokerto",
    "gorden custom",
    "gorden rumah",
    "toko gorden termurah purwokerto",
    "toko gorden purwokerto",
    "toko gorden murah",
    "gorden murah",
    "gorden kantor",
    "gorden hotel",
    "gorden masjid",
    "roller blind",
    "vertical blind",
    "roman blind",
    "roman shade",
    "vitrase",
    "blackout",
    "interior purwokerto",
    "gallery house purwokerto",
  ],

  authors: [
    {
      name: "Darsiti Gorden",
    },
  ],

  creator: "Darsiti Gorden",

  publisher: "Darsiti Gorden",

  applicationName: "Darsiti Gorden",

  category: "Business",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: "https://www.gordenmurahpurwokerto.store",

    siteName: "Darsiti Gorden",

    title:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",

    description:
      "Spesialis pembuatan dan pemasangan gorden custom premium untuk rumah, kantor, hotel, masjid, apartemen, cafe, dan villa.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Darsiti Gorden",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",

    description:
      "Jasa pembuatan dan pemasangan gorden premium di Purwokerto.",

    images: [
      "/images/og-image.jpg",
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],

    shortcut: "/favicon.ico",

    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C59D5F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body
        className="
          min-h-screen
          bg-background
          font-sans
          text-foreground
          antialiased
        "
      >
        {/* Header */}
        <AnnouncementBar />
        <Navbar />

        {/* Content */}
        <main>{children}</main>

        {/* Floating Button */}
        <WhatsAppFloat />

        {/* Scroll To Top */}
        <ScrollToTop />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}