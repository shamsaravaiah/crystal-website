import Link from "next/link";
import { redirect } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Add product",
};

export default async function NewProductPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="crystal-mesh min-h-screen px-5 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="text-[0.68rem] uppercase tracking-[0.2em] text-stone hover:text-ink"
        >
          ← Back to admin
        </Link>
        <h1 className="mt-4 font-display text-4xl">Add product</h1>
        <p className="mt-2 mb-10 text-sm text-ink-soft">
          Upload one or more photos and publish to the collection.
        </p>
        <AdminProductForm />
      </div>
    </div>
  );
}
