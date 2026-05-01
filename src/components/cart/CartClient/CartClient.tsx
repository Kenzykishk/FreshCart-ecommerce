"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { updateCartQty, removeFromCart, clearCart } from "@/actions/cart.action";

interface CartItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
  };
  count: number;
  price: number;
  _id: string;
}

interface CartData {
  data: {
    _id: string; 
    products: CartItem[];
    totalCartPrice: number;
  };
  numOfCartItems: number;
}

export default function CartClient({
  initialCart,
  isLoggedIn,
}: {
  initialCart: CartData | null;
  isLoggedIn: boolean;
}) {
  const [cart, setCart] = useState<CartData | null>(initialCart);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const items = cart?.data?.products ?? [];
  const total = cart?.data?.totalCartPrice ?? 0;
  const itemCount = cart?.numOfCartItems ?? items.length;
  const freeShipping = total >= 500;

  async function handleQtyChange(productId: string, newCount: number) {
    if (newCount < 1) return;
    setLoadingId(productId);
    const res = await updateCartQty(productId, newCount);
    if (res.ok && res.data) setCart(res.data);
    else toast.error("Failed to update quantity");
    setLoadingId(null);
  }

  async function handleRemove(productId: string) {
    setLoadingId(productId);
    const res = await removeFromCart(productId);
    if (res.ok && res.data) setCart(res.data);
    else toast.error("Failed to remove item");
    setLoadingId(null);
  }

  async function handleClearCart() {
    const res = await clearCart();
    if (res.ok) {
      setCart(null);
      toast.success("Cart cleared");
    } else {
      toast.error("Failed to clear cart");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
    
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 p-2.5 rounded-xl">
            <Icon icon="mdi:cart" className="text-green-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 text-md mb-8 ml-1">
          You have{" "}
          <span className="text-green-600 font-semibold">
            {itemCount} {itemCount !== 1 ? "items" : "item"}
          </span>{" "}
          in your cart
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
        
          <div className="flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center gap-4">
                <div className="bg-gray-100 p-5 rounded-full">
                  <Icon icon="mdi:cart-outline" className="text-4xl text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-700">Your cart is empty</p>
                <Link
                  href="/products"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-md hover:bg-green-700 transition"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-opacity ${
                    loadingId === item.product._id ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex gap-5">
                  
                    <div className="  shrink-0 w-28 h-28 rounded-xl  bg-gray-50 border border-gray-100">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                        <span className="flex items-center gap-1 text-xs mt-2 px-2 bg-green-500 rounded-lg w-fit text-white font-medium">
                          <Icon icon="mdi:check" className="text-md " />
                          In Stock
                        </span>
                    </div>

                  
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-base leading-tight">
                          {item.product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                            {item.product.category?.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            · SKU: {item.product._id.slice(-5).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-green-600 font-bold mt-2 text-base">
                          {item.price}{" "}
                          <span className="text-green-600 font-bold text-sm">EGP</span>{" "}
                          <span className="text-gray-400 font-normal text-xs">per unit</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                      

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQtyChange(item.product._id, item.count - 1)}
                            disabled={item.count <= 1}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-500 hover:text-green-600 disabled:opacity-40 transition"
                          >
                            <Icon icon="mdi:minus" className="text-sm" />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm">
                            {item.count}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item.product._id, item.count + 1)}
                            className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                          >
                            <Icon icon="mdi:plus" className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">Total</p>
                        <p className="font-bold text-gray-900 text-lg">
                          {item.price * item.count}{" "}
                          <span className="text-md font-normal text-gray-500">EGP</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product._id)}
                        className="text-red-400 hover:text-red-600 transition p-1"
                      >
                        <Icon icon="mdi:trash-can-outline" className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-green-600 text-md transition flex items-center gap-1"
                >
                  <Icon icon="mdi:arrow-left" />
                  Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-md transition"
                >
                  <Icon icon="mdi:trash-can-outline" />
                  Clear all items
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            {isLoggedIn ? (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-green-600 px-5 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <Icon icon="mdi:shield-check" className="text-xl" />
                    <span className="font-bold text-lg">Order Summary</span>
                  </div>
                  <p className="text-green-100 text-xs mt-0.5">
                    {itemCount} {itemCount !== 1 ? "items" : "item"} in your cart
                  </p>
                </div>

                <div className="bg-white px-5 py-4 space-y-4">
                  {freeShipping && (
                    <div className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
                      <Icon icon="mdi:truck-fast" className="text-green-600 text-2xl shrink-0" />
                      <div>
                        <p className="text-md font-bold text-green-700">Free Shipping!</p>
                        <p className="text-xs text-green-600">You qualify for free delivery</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {total.toLocaleString()} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className={freeShipping ? "text-green-600 font-bold" : "font-medium"}>
                        {freeShipping ? "FREE" : "Calculated at checkout"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total</span>
                    <span className="font-bold text-gray-900 text-xl">
                      {total.toLocaleString()}{" "}
                      <span className="text-md font-normal text-gray-500">EGP</span>
                    </span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-md text-gray-500 hover:border-green-500 hover:text-green-600 transition">
                    <Icon icon="mdi:tag-outline" className="text-base" />
                    Apply Promo Code
                  </button>

                  <Link
                    href={`/checkout?id=${cart?.data?._id}`}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-3.5 transition w-full text-base"
                  >
                    <Icon icon="mdi:lock" />
                    Secure Checkout
                  </Link>

                  <div className="flex justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Icon icon="mdi:shield-check-outline" className="text-green-500" />
                      Secure Payment
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1">
                      <Icon icon="mdi:truck-fast-outline" className="text-green-500" />
                      Fast Delivery
                    </span>
                  </div>

                  <Link
                    href="/products"
                    className="block text-center text-xs text-gray-400 hover:text-green-600 transition"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 px-5 py-4">
                  <p className="text-white font-bold">Order Summary</p>
                </div>
                <div className="px-5 py-4 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium">{total} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-gray-500">Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-semibold">Estimated Total</span>
                    <span className="font-bold text-green-600">{total} EGP</span>
                  </div>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-3 transition w-full"
                  >
                    <Icon icon="mdi:account" />
                    Login to Checkout
                  </Link>
                  <p className="text-center text-xs text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-green-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    {[
                      "Your cart items will be saved",
                      "Track your orders easily",
                      "Access exclusive member deals",
                    ].map((t) => (
                      <p key={t} className="flex items-center gap-1.5">
                        <Icon icon="mdi:check" className="text-green-500" />
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}