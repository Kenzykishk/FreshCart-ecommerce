"use server";

import { getUserToken } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";
const BASE = "https://ecommerce.routemisr.com/api/v1";

async function getToken() {
  return await getUserToken();
}

export async function updateProfile(data: {
  name: string;
  email: string;
  phone: string;
}) {
  const token = await getToken();
  if (!token) return { ok: false, message: "Not authenticated" };

  const res = await fetch(`${BASE}/users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) return { ok: false, message: json.message || "Update failed" };

  revalidatePath("/profile/settings");
  return { ok: true, data: json };
}

export async function changePassword(data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const token = await getToken();
  if (!token) return { ok: false, message: "Not authenticated" };

  const res = await fetch(`${BASE}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) return { ok: false, message: json.message || "Failed" };

  return { ok: true };
}

export async function getAddresses() {
  const token = await getToken();
  if (!token) return { ok: false, data: [] };

  const res = await fetch(`${BASE}/addresses`, {
    headers: { token },
    cache: "no-store",
  });

  const json = await res.json();
  return { ok: res.ok, data: json.data ?? [] };
}

export async function addAddress(data: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  const token = await getToken();
  if (!token) return { ok: false, message: "Not authenticated" };

  const res = await fetch(`${BASE}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) return { ok: false, message: json.message || "Failed" };

  revalidatePath("/profile/addresses");
  return { ok: true, data: json };
}

export async function deleteAddress(addressId: string) {
  const token = await getToken();
  if (!token) return { ok: false };

  const res = await fetch(`${BASE}/addresses/${addressId}`, {
    method: "DELETE",
    headers: { token },
  });

  revalidatePath("/profile/addresses");
  return { ok: res.ok };
}