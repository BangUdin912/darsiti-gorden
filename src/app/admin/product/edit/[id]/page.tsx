import { notFound } from "next/navigation";

import ProductForm from "@/components/admin/product/ProductForm";
import { productService } from "@/lib/productService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await productService.getById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Product
      </h1>

      <ProductForm
        initialValues={product}
        submitText="Update Product"
      />
    </div>
  );
}