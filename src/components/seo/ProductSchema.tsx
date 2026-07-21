import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductSchema({ product }: Props) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://darsitigorden.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description:
      product.short_description ??
      product.description ??
      `${product.name} merupakan produk gorden custom premium dari Darsiti Gorden.`,

    image: [
      product.image ??
        `${siteUrl}/images/og-image.jpg`,
    ],

    brand: {
      "@type": "Brand",
      name: "Darsiti Gorden",
    },

    category:
      Array.isArray(product.category)
        ? product.category.join(", ")
        : product.category,

    sku: product.id,

    url: `${siteUrl}/product/${product.slug}`,

    manufacturer: {
      "@type": "Organization",
      name: "Darsiti Gorden",
    },

    offers: {
  "@type": "Offer",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  priceSpecification: {
    "@type": "PriceSpecification",
    priceCurrency: "IDR",
  },
  url: `${siteUrl}/product/${product.slug}`,
  seller: {
    "@type": "Organization",
    name: "Darsiti Gorden",
  },
},
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