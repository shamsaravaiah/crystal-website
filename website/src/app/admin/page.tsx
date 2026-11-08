import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listProducts } from "@/lib/products";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import AdminDeleteButton from "@/components/AdminDeleteButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
};

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const products = listProducts();

  return (
    <div className="crystal-mesh min-h-screen px-5 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="font-display text-3xl">Admin</h1>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone">
                Manage products
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-ghost">
              View site
            </Link>
            <Link href="/admin/products/new" className="btn-primary">
              Add product
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden border border-[var(--line)] bg-cream/70">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--line)] bg-cream-deep/80 text-[0.68rem] uppercase tracking-[0.16em] text-stone">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Category
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Images
                </th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[var(--line)] last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-cream-deep">
                        <Image
                          src={product.images[0] || "/logo.jpg"}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-ink">{product.name}</p>
                        {product.featured ? (
                          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold-deep">
                            Featured
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">
                    {product.category}
                  </td>
                  <td className="hidden px-4 py-3 text-ink-soft md:table-cell">
                    {product.images.length}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="border border-[var(--line)] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] hover:border-ink"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!products.length && (
            <p className="px-4 py-12 text-center text-ink-soft">
              No products yet. Add your first piece.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
