"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/home/Products/ProductCard/ProductCard';


interface RelatedProductsProps {
  products: any[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const filtered = products.filter(p => p._id !== currentProductId);

  return (

    <>
    <div className=" mt-2">
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: '.related-prev', nextEl: '.related-next' }}
        spaceBetween={16}
        breakpoints={{
          0:    { slidesPerView: 1 },
          640:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {filtered.map((product) => (
        <SwiperSlide key={product._id}>
  <ProductCard prod={product} />
</SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
    
  );
}