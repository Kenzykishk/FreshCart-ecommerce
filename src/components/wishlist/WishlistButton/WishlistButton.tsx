
"use client";
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist.action";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function WishlistButton({ productId }: { productId: string }) {
  const { wishlistIds, setWishlistIds } = useWishlist();
  const inWishlist = wishlistIds.includes(productId);

  async function handleToggle() {
    if (inWishlist) {
      await removeFromWishlist(productId);
      setWishlistIds(wishlistIds.filter(id => id !== productId));
      toast.success("Removed from Wishlist");
    } else {
      await addToWishlist(productId);
      setWishlistIds([...wishlistIds, productId]);
      toast.success("Added to Wishlist ");
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
    className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl transition-all
  ${inWishlist
    ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100 hover:text-red-500 hover:border-red-300"
    : "border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-500 hover:bg-transparent"
  }`}
    >
      <Icon icon={inWishlist ? "ph:heart-fill" : "ph:heart"} width="20" height="20" />
      {inWishlist ? "In Wishlist" : "Add to Wishlist"}
    </Button>
  );
}