import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import ProductDetailContent from "@/components/ProductDetailContent";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();

  return (
    <SiteShell>
      <ProductDetailContent product={product} />
    </SiteShell>
  );
}
