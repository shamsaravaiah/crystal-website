import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createProduct, listProducts } from "@/lib/products";
import { isSameOriginRequest } from "@/lib/security";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "1";
  const category = searchParams.get("category") || undefined;
  const products = listProducts({ featured: featured || undefined, category });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || typeof body.name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const product = createProduct({
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price === "" || body.price == null ? null : Number(body.price),
    currency: body.currency,
    images: Array.isArray(body.images) ? body.images : [],
    featured: Boolean(body.featured),
  });

  return NextResponse.json(product, { status: 201 });
}
