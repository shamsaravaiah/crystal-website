import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteProduct, getProductById, updateProduct } from "@/lib/products";
import { isSameOriginRequest } from "@/lib/security";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const product = updateProduct(id, {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price === "" || body.price == null ? null : Number(body.price),
    currency: body.currency,
    images: Array.isArray(body.images) ? body.images : undefined,
    featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
