import MainSlider from '@/components/home/MainSlider/MainSlider'
import React from 'react'
import FeaturesData from '@/components/Shared/FeaturesData/FeaturesData';
import Categories from '@/components/home/Categories/Categories';
import PromoCard from '@/components/home/PromoCard/PromoCard';
import Products from '@/components/home/Products/Products';
import HomeForm from '@/components/home/HomeForm/HomeForm';
import { footerFeaturesData } from '@/constants/features';

const featuresData=[
  {

    icon:"mdi-truck",
    title:"Free Shipping",
description:"On orders over 500 EGP",
color:"#EFF6FF",
text_color:"#2B7FFF",
  },


  {
    icon:"fa7-solid:shield-halved",
    title:"Secure Payment",
description:"100% secure transactions",
color:"#ECFDF5",
text_color:"#00BC7D",

  },


  {
    icon:"fa7-solid:arrow-left-rotate",
    title:"Easy Returns",
description:"14-day return policy",
color:"#FFF7ED",
text_color:"#FF6900",


  },


  {
    icon:"basil:headset-solid",
    title:"24/7 Support",
description:"Dedicated support team",
color:"#FAF5FF",
text_color:"#AD46FF",
  }
]






export default function HomePage() {
  return (
    <>
    


      <div>
<MainSlider></MainSlider>
<FeaturesData featuresData={featuresData}></FeaturesData>
<Categories></Categories>
<PromoCard></PromoCard>
<Products></Products>
<HomeForm></HomeForm>
<FeaturesData featuresData={footerFeaturesData}   isFooter={true} />
    </div>
    </>

  
  )
}
