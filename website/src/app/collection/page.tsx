import SiteShell from "@/components/SiteShell";
import CollectionContent from "@/components/CollectionContent";
import { listCategories, listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Collection",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = listCategories();
  const products = listProducts({ category: category || undefined });

  return (
    <SiteShell>
      <CollectionContent
        products={products}
        categories={categories}
        activeCategory={category}
      />
    </SiteShell>
  );
}
