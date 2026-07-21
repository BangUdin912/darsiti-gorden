import type { MetadataRoute } from "next";

const BASE_URL =
  "https://www.gordenmurahpurwokerto.store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        // Blokir halaman admin & login
        disallow: [
          "/admin/",
          "/login/",
          "/api/",
        ],
      },

      // Opsional: crawler AI populer
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}