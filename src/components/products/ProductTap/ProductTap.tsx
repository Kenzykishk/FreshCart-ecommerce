'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Product } from '@/interfaces/product.interface'
import { Icon } from '@iconify/react'
import RatingBars from '../RatingBars/RatingBars';




interface ProductTapProps {
  product: Product
}
const shipping = [
  'Free shipping on orders over $50',
  'Standard delivery: 3-5 business days',
  'Express delivery available (1-2 business days)',
  'Track your order in real-time'
];

const returnPoints = [
  '30-day hassle-free returns',
  'Full refund or exchange available',
  'Free return shipping on defective items',
  'Easy online return process'
];
export default function ProductTap({product}:ProductTapProps) {

  return (
    <>
    <div className="mt-12 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="  justify-start h-auto py-5 bg-transparent border-b border-gray-100 rounded-none ">
          <TabsTrigger 
            value="details"
        className="  hover:text-green-600 hover:bg-gray-50 px-6 py-4 text-md font-medium transition-all rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:bg-green-50/30"
 
          >
            <Icon icon="boxicons:box-filled" className="me-2" width="18" />
            Product Details
          </TabsTrigger>
          
          <TabsTrigger 
            value="reviews" 
            className="  hover:text-green-600 hover:bg-gray-50 px-6 py-4 text-md font-medium transition-all rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:bg-green-50/30"
          >
            <Icon icon="material-symbols:star-rounded" className="me-2" width="18" />
            Reviews ({product.ratingsQuantity})
          </TabsTrigger>

          <TabsTrigger 
            value="shipping" 
            className=" hover:text-green-600 hover:bg-gray-50  px-6 py-4 text-md font-medium transition-all rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:bg-green-50/30"
          >
            <Icon icon="mingcute:truck-fill" className="me-2" width="18" />
            Shipping & Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-6">
           <h3 className="text-lg font-bold ">About this Product</h3>
           <p className="text-gray-600  text-md leading-relaxed my-3">{product.description}</p>
           <div className='flex flex-col md:flex-row gap-6 items-stretch'>









<div className='rounded-xl bg-gray-50/50 p-6 border border-gray-100 flex-1 flex flex-col'>
    <h4 className="font-bold text-gray-900 mb-5 text-sm">Product Information</h4>
    
    <ul className='flex flex-col gap-4 flex-1'>
      <li className='flex justify-between items-center'>
        <span className='text-gray-500 text-sm'>Category</span>
        <span className='text-gray-900 font-medium text-sm'>{product.category.name}</span>
      </li>

      <li className='flex justify-between items-center'>
        <span className='text-gray-500 text-sm'>SubCategory</span>
        <span className='text-gray-900 font-medium text-sm'>{product.subcategory[0]?.name}</span>
      </li>

      <li className='flex justify-between items-center'>
        <span className='text-gray-500 text-sm'>Brand</span>
        <span className='text-gray-900 font-medium text-sm'>{product.brand.name}</span>
      </li>

      <li className='flex justify-between items-center'>
        <span className='text-gray-500 text-sm'>Items Sold</span>
        <span className='text-gray-900 font-medium text-sm'>{product.sold}+ sold</span>
      </li>
    </ul>
  </div>






<div className='rounded-xl bg-gray-50/50 p-6 border border-gray-100 flex-1 flex flex-col'>
    <h4 className="font-bold text-gray-900 mb-5 text-sm">Key Features</h4>
    
    <ul className='space-y-4 flex-1'>
      <li className='flex items-center text-sm text-gray-700 font-medium'>
        <Icon icon="fluent:checkmark-12-filled" className='text-green-600 me-3 shrink-0' width="20" />
        Premium Quality Product
      </li>
      
      <li className='flex items-center text-sm text-gray-700 font-medium'>
        <Icon icon="fluent:checkmark-12-filled" className='text-green-600 me-3 shrink-0' width="20" />
        100% Authentic Guarantee
      </li>
      
      <li className='flex items-center text-sm text-gray-700 font-medium'>
        <Icon icon="fluent:checkmark-12-filled" className='text-green-600 me-3 shrink-0' width="20" />
        Fast & Secure Packaging
      </li>
      
      <li className='flex items-center text-sm text-gray-700 font-medium'>
        <Icon icon="fluent:checkmark-12-filled" className='text-green-600 me-3 shrink-0' width="20" />
        Quality Tested
      </li>
    </ul>
  </div>
           </div>
        </TabsContent>

        <TabsContent value="reviews" className="p-8">
<RatingBars  ratingsAverage={product.ratingsAverage} ratingsQuantity={product.ratingsQuantity}></RatingBars>
        </TabsContent>

<TabsContent value="shipping" className="p-8 outline-none animate-in fade-in duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100/50 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-2.5 rounded-full text-white shadow-sm shadow-green-200">
              <Icon icon="mdi:truck" width="24" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Shipping Information</h4>
          </div>
          
          <ul className="space-y-4 flex-1">
            {shipping.map((text, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700 leading-tight group">
                <Icon 
                  icon="lucide:check" 
                  className="text-green-600 me-3 mt-0.5 shrink-0 transition-transform group-hover:scale-110" 
                  width="18" 
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100/50 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-2.5 rounded-full text-white shadow-sm shadow-green-200">
              <Icon icon="fa6-solid:rotate-left" width="24" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Returns & Refunds</h4>
          </div>
          
          <ul className="space-y-4 flex-1">
            {returnPoints.map((text, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700 leading-tight group">
                <Icon 
                  icon="lucide:check" 
                  className="text-green-600 me-3 mt-0.5 shrink-0 transition-transform group-hover:scale-110" 
                  width="18" 
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-8 p-5 bg-gray-50/80 rounded-mdf border border-gray-100 flex items-center gap-5 transition-all ">
        <div className="bg-gray-200 p-3.5 rounded-full text-gray-600 shrink-0 shadow-inner">
          <Icon icon="fa7-solid:shield-halved" width="28" />
        </div>
        
        <div className="space-y-1">
<h4 className="font-semibold text-lg text-gray-900 mb-1">Buyer Protection Guarantee</h4>
        <p className="text-md text-gray-600">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
        </div>
      </div>

    </TabsContent>




















      </Tabs>
    </div>
    
    
    
    
    
    
    
    
    
    </>
  )
}
