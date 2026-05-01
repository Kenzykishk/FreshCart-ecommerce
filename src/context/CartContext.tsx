"use client";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserCart } from "@/actions/cart.action";

const cartContext = createContext({ 
  numOfCartItems: 0, 
  updateNumberOfCartItems: (count: number) => {} 
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getUserCart().then((res) => {
        console.log("CART RESPONSE:", JSON.stringify(res?.data, null, 2)); // ← هنا
        if (res?.ok && res.data?.numOfCartItems !== undefined) {
          setnumOfCartItems(res.data.numOfCartItems);
        }
      });
    }
    if (status === "unauthenticated") {
      setnumOfCartItems(0);
    }
  }, [status]);

  function updateNumberOfCartItems(count: number) {
    setnumOfCartItems(count);
  }

  return (
    <cartContext.Provider value={{ numOfCartItems, updateNumberOfCartItems }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  return useContext(cartContext);
}