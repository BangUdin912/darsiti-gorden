import type {
  Metadata,
  Viewport,
} from "next";

import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

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

const SITE_URL =
  "https://www.gordenmurahpurwokerto.store";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",
    template: "%s | Darsiti Gorden",
  },

  description:
    "Darsiti Gorden melayani jasa pembuatan dan pemasangan gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, villa, cafe, masjid, sekolah, dan berbagai kebutuhan interior di Purwokerto serta sekitarnya.",

  keywords: [
    "gorden purwokerto",
    "gorden murah purwokerto",
    "gorden custom purwokerto",
    "toko gorden purwokerto",
    "gorden minimalis purwokerto",
    "gorden blackout purwokerto",
    "gorden rumah",
    "gorden ruang tamu",
    "gorden jendela",
    "gorden hotel purwokerto",
    "gorden kantor purwokerto",
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
      url: SITE_URL,
    },
  ],

  creator: "Darsiti Gorden",

  publisher: "Darsiti Gorden",

  applicationName: "Darsiti Gorden",

  generator: "Next.js",

  category: "Business",

  classification:
    "Curtain Store & Interior Decoration",

  abstract:
    "Spesialis jasa pembuatan dan pemasangan gorden custom premium di Purwokerto.",

  alternates: {
    canonical: SITE_URL,
  },

  manifest: "/site.webmanifest",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  /**
   * Isi token hanya jika menggunakan HTML Verification.
   * Jika Search Console menggunakan Domain Property (DNS),
   * bagian ini boleh dikosongkan.
   */
  verification: {
    // google: "xxxxxxxxxxxxxxxxxxxx",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: SITE_URL,

    siteName: "Darsiti Gorden",

    countryName: "Indonesia",

    title:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",

    description:
      "Jasa pembuatan dan pemasangan gorden custom premium untuk rumah, kantor, hotel, apartemen, villa, cafe, masjid, dan sekolah di Purwokerto.",

    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Darsiti Gorden Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Darsiti Gorden | Spesialis Gorden Custom Purwokerto",

    description:
      "Jasa pembuatan dan pemasangan gorden custom premium di Purwokerto.",

    images: [
      `${SITE_URL}/images/og-image.jpg`,
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },

  appleWebApp: {
    capable: true,
    title: "Darsiti Gorden",
    statusBarStyle: "default",
  },

  appLinks: {
    web: {
      url: SITE_URL,
      should_fallback: true,
    },
  },

  other: {
    google: "notranslate",
  },
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: "#C59D5F",

  colorScheme: "light",
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
        {/* Structured Data */}
        <LocalBusinessSchema />

        {/* Header */}
        <AnnouncementBar />
        <Navbar />

        {/* Content */}
        <main>{children}</main>

        {/* Floating Button */}
        <WhatsAppFloat />

        {/* Utility */}
        <ScrollToTop />

        {/* Footer */}
        <Footer />

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            gaId={
              process.env
                .NEXT_PUBLIC_GA_MEASUREMENT_ID
            }
          />
        )}
      </body>
    </html>
  );
}