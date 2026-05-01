import React from 'react';
import  Link  from 'next/link';
import { Package } from 'lucide-react'; 
import FeaturesData from '@/components/Shared/FeaturesData/FeaturesData';
import { footerFeaturesData } from '@/constants/features';
import { Icon } from '@iconify/react';


export default function orderspage() {
return (
  

    <>
    
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-2xl mb-6">
<Icon icon={"fa7-solid:box-open"} className='size-9 text-gray-400'></Icon>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No orders yet
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
        When you place orders, they'll appear here so you can track them.
      </p>

      <Link
        href="/"
        className="bg-[#22c55e] hover:bg-[#1ca850] text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-sm"
      >

<Icon icon={"material-symbols:shopping-bag"} className='size-5'></Icon>
        Start Shopping
      </Link>
    </div>
  <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    
    </>
  );
}
