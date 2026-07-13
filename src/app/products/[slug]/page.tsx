import { notFound } from "next/navigation";

import ProductDetail from "@/components/product/ProductDetail";
import { productService } from "@/lib/productService";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  console.log("Slug:", slug);

  const product = await productService.getBySlug(slug);

  console.log(product);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}