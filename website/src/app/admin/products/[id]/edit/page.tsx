import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { isAuthenticated } from "@/lib/auth";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Edit product",
};

export default async function EditProductPage({ params }: Props) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="crystal-mesh min-h-screen px-5 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="text-[0.68rem] uppercase tracking-[0.2em] text-stone hover:text-ink"
        >
          ← Back to admin
        </Link>
        <h1 className="mt-4 font-display text-4xl">Edit product</h1>
        <p className="mt-2 mb-10 text-sm text-ink-soft">{product.name}</p>
        <AdminProductForm product={product} />
      </div>
    </div>
  );
}
