export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",

    "@id": "https://www.gordenmurahpurwokerto.store/#business",

    name: "Darsiti Gorden",

    alternateName: "Darsiti Gorden Purwokerto",

    url: "https://www.gordenmurahpurwokerto.store",

    logo: "https://www.gordenmurahpurwokerto.store/images/logo.png",

    image: [
      "https://www.gordenmurahpurwokerto.store/images/og-image.jpg",
    ],

    description:
      "Darsiti Gorden merupakan spesialis pembuatan dan pemasangan gorden custom untuk rumah, kantor, hotel, apartemen, masjid, villa, café, sekolah, dan berbagai kebutuhan interior di Purwokerto dan sekitarnya.",

    telephone: "+6281915118782",

    email: "info@gordenmurahpurwokerto.store",

    priceRange: "$$",

    areaServed: [
      {
        "@type": "City",
        name: "Purwokerto",
      },
      {
        "@type": "AdministrativeArea",
        name: "Banyumas",
      },
      {
        "@type": "AdministrativeArea",
        name: "Purbalingga",
      },
      {
        "@type": "AdministrativeArea",
        name: "Cilacap",
      },
      {
        "@type": "AdministrativeArea",
        name: "Banjarnegara",
      },
    ],

    address: {
      "@type": "PostalAddress",
      addressLocality: "Purwokerto",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude: -7.4241,

      longitude: 109.2396,
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",

        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],

        opens: "08:00",

        closes: "17:00",
      },
    ],

    sameAs: [
      "https://wa.me/6281915118782",
    ],

    knowsAbout: [
      "Gorden Custom",
      "Blackout Curtain",
      "Vitrase",
      "Roller Blind",
      "Vertical Blind",
      "Roman Blind",
      "Wooden Blind",
      "Curtain Installation",
      "Interior Rumah",
      "Interior Kantor",
      "Hotel Curtain",
    ],

    makesOffer: [
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Pembuatan Gorden Custom",
        },
      },
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Pemasangan Gorden",
        },
      },
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Survey dan Pengukuran",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}