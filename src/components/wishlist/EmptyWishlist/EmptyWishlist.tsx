import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Heart } from "lucide-react";

export default function EmptyWishlist() {
return (
    


<>
<div className="flex flex-col items-center justify-center h-96 px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-2xl mb-6">
        <Heart size={48} className="text-gray-400" strokeWidth={1.5} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Browse products and save your favorites here.
      </p>

      <Link
        href="/products"
        className="bg-[#22c55e] hover:bg-[#1ca850] text-white font-medium py-3 px-10 rounded-lg transition-colors flex items-center gap-2"
      >
        Browse Products 

<Icon icon="tabler:arrow-right" className="size-5"></Icon>
      </Link>
    </div>
    <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>

</>


  );
}
