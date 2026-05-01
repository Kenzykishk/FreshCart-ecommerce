"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { addToCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext"; 

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const { numOfCartItems, updateNumberOfCartItems } = useCart();

  async function handleAddToCart() {
    setLoading(true);
    const res = await addToCart(productId);
    setLoading(false);
    if (res?.ok) {
      const newCount = res.data?.numOfCartItems;
      if (newCount !== undefined) updateNumberOfCartItems(newCount);
      toast.success("Added to cart!");
    } else {
      toast.error("Failed to add to cart");
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-green-600 text-white h-12 rounded-xl font-bold hover:bg-green-700 transition w-full disabled:opacity-70"
    >
      {loading ? (
        <Icon icon="mdi:loading" className="animate-spin text-xl" />
      ) : (
        <Icon icon="ic:baseline-shopping-cart" width="22" height="22" />
      )}
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}