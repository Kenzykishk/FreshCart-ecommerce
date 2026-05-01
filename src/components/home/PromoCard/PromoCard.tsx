import React from 'react';
import Link from 'next/link'; 
import { Button } from "@/components/ui/button";

const promoData = [
  {
    badge: " Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    buttonText: "Shop Now",
    href: "/shop",
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    text_color:"text-emerald-600"
  },
  {
    badge: " New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    buttonText: "Explore Now",
    href: "/shop",
    bg: "bg-gradient-to-br from-orange-400 to-red-500",
    text_color:"text-orange-500"
  },
];

export default function PromoCard() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mt-3">
          {promoData.map((promo) => (
            <div
              key={promo.title}
              className={`${promo.bg} rounded-3xl p-8 text-white relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                {promo.badge}
              </span>

              <h3 className="text-3xl font-bold mb-2 leading-tight">{promo.title}</h3>

              <p className="text-white/80 mb-6 max-w-[280px] text-sm md:text-base">
                {promo.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black tracking-tighter">{promo.discount}</span>
                <div className="flex flex-col border-l border-white/30 pl-4">
                  <span className="text-[10px] uppercase opacity-70 font-bold">Use code</span>
                  <span className="font-mono font-bold text-sm bg-black/10 px-2 py-0.5 rounded">
                    {promo.code}
                  </span>
                </div>
              </div>

              <Button 
                asChild 
                variant="secondary" 
                className={`rounded-full bg-white  hover:bg-gray-100 text-lg font-semibold py-7 px-8 shadow-lg ${promo.text_color}`}
              >
                <Link href={promo.href} >
                  {promo.buttonText} <span className="ms-2">→</span>
                </Link>
              </Button>

<div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
<div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}