"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import homeSlider from "@/assets/images/homeSlider.png";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';



const images=[

  {
path:homeSlider,
title:"Fresh Products Delivered to your Door",
description:"Get 20% off your first order",
buttons:[
  {
text:"Shop Now",
 link: "/products",
variant:"primary"
  },
  {
text: "View Deals",
 link: "/products", 
 variant: "outline"
  }
],
color:"#00C950"
  },


  {
path:homeSlider,
title:"Premium Qulaity Guaranteed ",
description:"Fresh from farm to your table",
buttons:[
  {
text:"Shop Now",
 link: "/products",
variant:"primary"
  },
  {
text: "Learn More",
 link: "/products", 
 variant: "outline"
  }
],
color:"#2B7FFF"

  },




  {
path:homeSlider,
title:"Fast & Free Delivery",
description:"Same day delivery available",
buttons:[
  {
text:"Order Now",
 link: "/products",
variant:"primary"
  },
  {
text: "Delivery info",
 link: "/products", 
 variant: "outline"
  }
],
color:"#AD46FF"
  }
]


const basicOptions={
  pagination:{
    clickable: true,
    bulletActiveClass:"swiper-pagination-bullet-active !w-8 !h-3 !rounded-sm !bg-white"
  },
  modules:[Pagination, Navigation],
navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  loop:true,
  slidesPerView:1,
    spaceBetween:30
}
export default function MainSlider() {
  return (

    <section className='w-full'>

         <Swiper
      {...basicOptions}
        className="mySwiper relative"
      >
        {
          images.map(
            (img,idx)=>(
              <SwiperSlide key={idx} className='relative'>
                <Image src={img.path} width={1920} height={400} alt={`slide-${idx + 1}`} className='w-full object-cover h-96'></Image>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C950]/90 to-[#00C950]/45
                 ">
    </div>
    <div className='absolute  inset-0  ps-1 pr-8 py-9 flex flex-col max-w-99 mt-21 ms-28 '>
      <h2 className='text-white  text-3xl font-bold    leading-9'>{img.title}</h2>
      <p className='text-white mt-4'>{img.description}</p>
      <div className='mt-4'>
        {
          img.buttons.map((btn,i)=>(
<Link href={btn.link} key={i}>
      <Button
        style={btn.variant === "primary" ? { color: img.color } : {}}
        className={btn.variant === "primary" 
          ? "bg-white me-2 text-[#00C950] rounded-lg px-6 py-5 font-semibold hover:scale-105 transition-transform" 
          : "px-6 py-5 rounded-lg border-2 border-white/50 text-white bg-transparent hover:scale-105 transition-transform"}
      >
        {btn.text}
      </Button>
    </Link>          ))
        }
      </div>
    </div>
              </SwiperSlide>
            )
              
            )
          
        }
      
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10  bg-[#E8F9EF] rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:scale-105 group hover:bg-white">
        <ChevronLeft className="text-green-500 w-6 h-6 transition-colors duration-300 group-hover:text-[#017a2d]" />
      </button>

      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#E8F9EF] rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:scale-105 group hover:bg-white">
        <ChevronRight className="text-green-500 w-6 h-6 transition-colors duration-300 group-hover:text-[#017a2d]" />
      </button>

  
      </Swiper>
        
  
    </section>


  )
}
