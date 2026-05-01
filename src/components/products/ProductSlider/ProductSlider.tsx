"use client"
import Image from 'next/image'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import  { useState } from 'react';

interface ProductSliderProps {
  images: string[]
}

export default function ProductSlider({ images }: ProductSliderProps) {
const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className="border rounded-lg  mx-auto pb-5">
      
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-center items-center bg-white p-4  h-[470px]">
              <Image
                src={src}
                alt={`product-${idx}`}
                width={344}
                height={470}
                className="object-contain w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
          centeredSlides={false}
        centeredSlidesBounds={true}  
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="thumbs-swiper px-2 pb-4"
        slideToClickedSlide={true}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="cursor-pointer ">
            <div className="thumb-item border-4 border-transparent  overflow-hidden transition-all aspect-square">
              <Image
                src={src}
                alt={`thumb-${idx}`}
                width={92}
                height={92}
                className="object-cover w-full h-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}