import { getUserCart } from "@/actions/cart.action";
import CartClient from "@/components/cart/CartClient/CartClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  let cartData = null;
  if (isLoggedIn) {
    const res = await getUserCart();
    if (res.ok) cartData = res.data;
  }

  return <CartClient initialCart={cartData} isLoggedIn={isLoggedIn} />;
}