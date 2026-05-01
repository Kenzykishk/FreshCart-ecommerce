
import { getWishlist } from "@/actions/wishlist.action";
import WishlistClient from "@/components/wishlist/WishlistClient/WishlistClient";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist/EmptyWishlist";
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";

export default async function WishlistPage() {
  const data = await getWishlist(); 
  const items = data.data || [];

  if (items.length === 0) return <EmptyWishlist />;

  return (
    <>
      <WishlistClient initialItems={items} />
      <FeaturesData featuresData={footerFeaturesData} isFooter={true} />
    </>
  );
}