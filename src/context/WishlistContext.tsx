
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getWishlist } from "@/actions/wishlist.action";

const wishlistContext = createContext({
  wishlistIds: [] as string[],
  setWishlistIds: (ids: string[]) => {},
  wishlistCount: 0,
});

export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getWishlist().then((data) => {
        if (data?.data) {
          const ids = data.data.map((item: any) => item._id || item.id);
          setWishlistIds(ids);
        }
      });
    }

    if (status === "unauthenticated") {
      setWishlistIds([]); 
    }
  }, [status]); 

  return (
    <wishlistContext.Provider value={{
      wishlistIds,
      setWishlistIds,
      wishlistCount: wishlistIds.length,
    }}>
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(wishlistContext);
}