
"use client"
import { Icon } from '@iconify/react'
import React from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'

const features = [
  {
    icon: "mdi:leaf",
    text: "Fresh Picks Weekly"
  },
  {
    icon: "mdi:truck",
    text: "Free Delivery Codes"
  },
  {
    icon: "mdi:tag",
    text: "Members-Only Deals"
  }
]

export default function HomeForm() {
  return (
    <section className='py-10'>
      <div className="container">
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-16 rounded-[2.5rem] border border-emerald-100/50 bg-linear-to-br from-emerald-50 via-white to-teal-50'>
          
          <div className='lg:col-span-3'>
            
            <div className='flex flex-row items-center'>
              <div className='rounded-2xl w-14 h-14 flex justify-center items-center shadow-lg bg-gradient-to-b from-emerald-500 to-teal-500 shadow-emerald-500/20'>
                <Icon icon="boxicons:envelope-filled" className="size-6 text-white" />
              </div>
              <div className='ms-4'>
                <h3 className='text-emerald-600 font-bold text-sm tracking-widest'>NEWSLETTER</h3>
                <p className='text-xs text-gray-500 font-medium'>50,000+ subscribers</p>
              </div>
            </div>

            <h2 className='text-gray-900 font-extrabold text-3xl lg:text-4xl mt-8 leading-tight'>
              Get the Freshest Updates 
              <span className='text-emerald-600 block lg:inline lg:ms-2'>Delivered Free</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg lg:text-xl font-medium">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {features.map((item, index) => (
                <div 
                  key={index} 
                  className="py-2.5 px-5 rounded-full shadow-sm flex items-center bg-white border border-emerald-100 hover:border-emerald-300 transition-colors"
                >
                  <div className='bg-emerald-100 rounded-full w-7 h-7 flex items-center justify-center'>
                    <Icon icon={item.icon} className='text-emerald-600 text-sm' />
                  </div>
                  <span className="text-sm ms-2.5 font-semibold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className='mt-10'>
              <form className='flex flex-col sm:flex-row gap-4 max-w-2xl' onSubmit={(e) => e.preventDefault()}>
                <div className='flex-1 relative'>
                  <Input 
                    placeholder='you@example.com' 
                    type="email" 
                    className='px-6 h-16 rounded-2xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 placeholder:text-gray-400 shadow-sm bg-white border-gray-200 border-2 text-lg transition-all w-full'
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="group h-16 flex items-center justify-center gap-3 px-10 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Icon icon="fa6-solid:arrow-right" className="text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className='text-sm text-gray-400 mt-4 flex items-center gap-1.5'>
                <Icon icon="fluent-emoji-flat:sparkles" className="text-amber-400 size-4" />
                Unsubscribe anytime. No spam, ever.
              </p>
            </div>
          </div>

<div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
  <div className="h-full flex flex-col justify-center">
    
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>

      <div className="relative space-y-5">
        
        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
          📱 MOBILE APP
        </div>

        <h3 className="text-2xl font-bold leading-tight">
          Shop Faster on Our App
        </h3>

      
        <p className="text-gray-400 text-sm leading-relaxed">
          Get app-exclusive deals & 15% off your first order.
        </p>

      
        <div className="flex flex-col gap-3 pt-2">

          
          <Link
            href="#"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
          >
            <Icon icon="mdi:apple" className="text-xl" />

            <div className="text-left">
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                Download on
              </div>
              <div className="text-sm font-semibold -mt-0.5">
                App Store
              </div>
            </div>
          </Link>

          
          <Link
            href="#"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
          >
            <Icon icon="mdi:google-play" className="text-xl" />

            <div className="text-left">
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                Get it on
              </div>
              <div className="text-sm font-semibold -mt-0.5">
                Google Play
              </div>
            </div>
          </Link>

        </div>

        <div className="flex items-center gap-2 pt-2 text-sm">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-gray-400">
            4.9 • 100K+ downloads
          </span>
        </div>

      </div>
    </div>

  </div>
</div>        

        </div>
      </div>
    </section>
  )
}