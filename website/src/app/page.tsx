import SiteShell from "@/components/SiteShell";
import HomeContent from "@/components/HomeContent";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featured = listProducts({ featured: true }).slice(0, 6);

  return (
    <SiteShell>
      <HomeContent featured={featured} />
    </SiteShell>
  );
}
