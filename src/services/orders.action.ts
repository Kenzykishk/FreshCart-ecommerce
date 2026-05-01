"use server";
import { getUserToken } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";

export async function getUserOrders() {
  const token = await getUserToken();
  const session = await getServerSession(authOptions);
  
  if (!token || !session) return { ok: false, data: [] };

  const userId = (session.user as any).id;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: { token },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return { ok: res.ok, data: res.ok ? data : [] };
}