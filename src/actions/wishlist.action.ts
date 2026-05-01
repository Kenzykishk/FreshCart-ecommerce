
"use server";
import { getUserToken } from "@/lib/server-utils";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist() {
  const token = await getUserToken();
  if (!token) return { data: [] };
  
  const res = await fetch(BASE_URL, {
    headers: { token },
    cache: "no-store",
  });
  return res.json();
}

export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) return { ok: false, message: "Not authenticated" };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { 
      token,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  return res.json();
}