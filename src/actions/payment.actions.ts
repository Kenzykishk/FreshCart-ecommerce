"use server"
import { getUserToken } from "@/lib/server-utils";
import { AddressPayloadType } from "@/schema/address.schema";
import { revalidateTag } from "next/cache"; 

export async function createOrder(cartId: string, formValues: AddressPayloadType) {
  const{paymentMethod, ...shippingAddress}=formValues
  const endpoint=paymentMethod==="cash"?`/api/v2/orders/${cartId}`:`/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}
`
  try {
    const token = await getUserToken();

    const resp = await fetch(`https://ecommerce.routemisr.com${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string
      },
      body: JSON.stringify({ shippingAddress }), 
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { status: false, message: data.message || "Failed to create order" };
    }

  revalidateTag("cart", "/");

    return { ...data, status: true };

  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Server Error"
    };
  }
}