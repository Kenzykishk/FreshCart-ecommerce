
"use client";
import { useState } from "react";
import { removeFromWishlist } from "@/actions/wishlist.action";
import { addToCart } from "@/actions/cart.action";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function WishlistClient({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const { setWishlistIds, wishlistIds } = useWishlist();

  async function handleRemove(productId: string) {
    setItems((prev) => prev.filter((i) => i._id !== productId));
    setWishlistIds(wishlistIds.filter((id) => id !== productId));
    await removeFromWishlist(productId);
    toast.success("Removed from Wishlist");
  }

  async function handleAddToCart(productId: string) {
    const res = await addToCart(productId);
    if (res?.status) toast.success("Added to Cart!");
    else toast.error("Failed to add to cart");
  }

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <p className="text-xl font-bold text-gray-700">Your wishlist is empty</p>
      <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg">
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-4">
  
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-100 p-3.5 rounded-lg">
          <Icon icon="ph:heart-fill" className="text-red-500 text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-gray-400 text-sm">
            {items.length} item{items.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

  
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b bg-gray-50 text-md  rounded-3xl  font-normal">
            <th className="py-3 font-normal ps-5">Product</th>
            <th className="font-normal">Price</th>
            <th className="font-normal">Status</th>
            <th className="font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const inCart = false; 
            return (
              <tr key={item._id} className="border-b hover:bg-gray-50 transition">
              
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-lg p-1 shrink-0">
                      <Image
                        src={item.imageCover}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.category?.name}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="font-bold text-md text-gray-800">
                    {item.priceAfterDiscount ?? item.price} EGP
                  </span>
                  {item.priceAfterDiscount && (
                    <span className="block text-sm text-gray-400 line-through">
                      {item.price} EGP
                    </span>
                  )}
                </td>

            
                <td>
                  {inCart ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                      <Icon icon="mdi:check" className="text-md" />
                      In Cart
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      In Stock
                    </span>
                  )}
                </td>

              
                <td>
                  <div className="flex items-center gap-2">
                    {inCart ? (
                      <Link
                        href="/cart"
                        className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <Icon icon="mdi:check" className="text-md" />
                        View Cart
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item._id)}
                        className="inline-flex items-center gap-1.5 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Icon icon="mdi:cart" className="text-md size-4" />
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-gray-300 border rounded-sm  hover:bg-red-50 hover:text-red-500 hover:border-red-400 transition p-2"
                    >
                      <Icon icon="mdi:trash" className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link
        href="/products"
        className="text-gray-500 mt-6 inline-block hover:text-green-600 text-md font-semibold transition"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}