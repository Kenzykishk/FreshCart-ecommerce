import CheckoutForm from "@/components/checkout/CheckoutForm/CheckoutForm";
import { getUserCart } from "@/actions/cart.action";
import { redirect } from "next/navigation";

interface CheckoutPageProps {
  searchParams: { id: string }
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { id } = await searchParams;

  const cartRes = await getUserCart();
  if (!cartRes.ok || !cartRes.data) redirect("/cart");

  const cartItems = cartRes.data?.data?.products ?? [];
  const totalPrice = cartRes.data?.data?.totalCartPrice ?? 0;

  return (
    <CheckoutForm
      cartId={id}
      cartItems={cartItems}
      totalPrice={totalPrice}
    />
  );
}