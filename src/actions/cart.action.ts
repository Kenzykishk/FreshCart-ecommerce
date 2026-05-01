"use server";
import { getUserToken } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";

const BASE = "https://ecommerce.routemisr.com/api/v2/cart";

export async function getUserCart() {
  const token = await getUserToken();
  if (!token) return { ok: false, data: null };

  const res = await fetch(BASE, {
    headers: { token },
    cache: "no-store",
  });
  const json = await res.json();
  return { ok: res.ok, data: json };
}

export async function addToCart(productId: string) {
  const token = await getUserToken();
  if (!token) return { ok: false, message: "Not authenticated" };

  const res = await fetch(BASE, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  const json = await res.json();
  if (res.ok) revalidatePath("/cart");
  return { ok: res.ok, data: json };
}

export async function updateCartQty(productId: string, count: number) {
  const token = await getUserToken();
  if (!token) return { ok: false };

  const res = await fetch(`${BASE}/${productId}`, {
    method: "PUT",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  });
  const json = await res.json();
  return { ok: res.ok, data: json };
}

export async function removeFromCart(productId: string) {
  const token = await getUserToken();
  if (!token) return { ok: false };

  const res = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  const json = await res.json();
  if (res.ok) revalidatePath("/cart");
  return { ok: res.ok, data: json };
}

export async function clearCart() {
  const token = await getUserToken();
  if (!token) return { ok: false };

  const res = await fetch(BASE, {
    method: "DELETE",
    headers: { token },
  });
  if (res.ok) revalidatePath("/cart");
  return { ok: res.ok };
}