
import FeaturesData from '@/components/Shared/FeaturesData/FeaturesData';
import { Button } from '@/components/ui/button';
import { footerFeaturesData } from '@/constants/features';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const pages = [
    { name: 'All Products', href: '/products', active: true },
    { name: 'Categories', href: '/categories', active: false },
    { name: 'Today\'s Deals', href: '/deals', active: false },
    { name: 'Contact Us', href: '/contact', active: false },
  ];

export default function notfound() {
  return (
    


  <>

<section className='py-20 relative'>
  <div>
    <div className=" absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-green-100/40 to-transparent rounded-full blur-3xl -z-10"></div>
    <div className=" absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
    <Icon icon="fa7-solid:apple-whole" className="absolute top-[10%] left-[5%] text-4xl text-green-300 animate-float-1 opacity-20" />
        <Icon icon="fa7-solid:apple-whole" className="absolute top-[50%] left-[15%] text-3xl text-green-200 animate-float-1 opacity-20" />
<Icon icon="mingcute:carrot-fill" className="absolute top-[20%] right-[10%] text-4xl animate-float-2 opacity-20 text-green-400" />
<Icon icon="boxicons:lemon-filled" className="absolute bottom-[25%] left-[8%] text-3xl text-green-300 animate-float-3 opacity-20" />
<Icon icon="ri:seedling-fill" className="absolute bottom-[15%] right-[15%] text-3xl text-green-300 animate-float-3 opacity-20" />

  </div>
  <div className="container">

<div className='flex flex-col justify-center   items-center'>



<div className='relative   flex flex-col '>
<div className='   rounded-2xl w-60 h-44 shadow-gray-200/60 shadow-xl flex justify-center items-center  '>
<Icon icon="material-symbols:shopping-cart" className='text-7xl text-green-400'></Icon>
</div>
<div className='absolute -top-2 -right-5 '>
  <div className='w-21 h-21 rounded-full shadow-xl bg-white flex justify-center items-center'>
  <div className='bg-gradient-to-br from-green-500 to-green-600  flex justify-center items-center shadow-lg shadow-emerald-500/40 rounded-full w-18 h-18  p-2 '>
    <span className=" text-2xl font-bold   text-white tracking-tight ">404</span>
  </div>
  </div>
</div>
<div className=' mx-auto  flex gap-3  mt-6'>
  <div className='w-3 h-3 rounded-full bg-green-400'></div>
  <div className='border-b-[3px] rounded-b-full  w-8 h-4 border-green-400'></div>
  <div className='w-3 h-3 rounded-full bg-green-400'></div>
</div>
</div>

<div className='text-center'>
  <h1 className=" text-5xl  font-extrabold text-gray-900 my-3 tracking-tight">Oops! Nothing Here</h1>
<p className='text-gray-500 text-lg mx-auto max-w-md'>Looks like this page went out of stock! Don't worry,there's plenty more fresh content to explore.</p>
</div>



<div className='mt-8 flex flex-col gap-4 items-center w-full lg:flex-row lg:justify-center'>
  

  <Button 
    variant="ghost" 
    asChild 
    className='bg-green-600 hover:bg-green-700 w-full sm:w-auto py-6 md:py-7 px-16 rounded-2xl shadow-lg shadow-green-600/25 hover:-translate-y-1 transition-all duration-300'
  >
    <Link href="/" className="flex justify-center items-center">
      <Icon icon="fa7-solid:house" className='text-white size-6 me-2' />
      <span className='text-white font-bold text-lg'>Go to Homepage</span>
    </Link>
  </Button>


  <Button 
    variant="ghost" 
    asChild 
    className='group bg-white hover:bg-white border-2 border-gray-200 w-full sm:w-auto py-6 md:py-7 px-16 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300'
  >
    <Link href="/" className="flex justify-center items-center">
      <Icon icon="formkit:arrowleft" className='text-gray-700 size-6 me-2 group-hover:-translate-x-1 transition-transform' />
      <span className='text-gray-700 font-bold text-lg'>Go Back</span>
    </Link>
  </Button>

</div>



<div className="flex justify-center py-10">
      <div className="bg-white border border-gray-100 rounded-[40px] shadow-sm p-8 max-w-4xl w-full text-center">
        
        <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-6">
          Popular Destinations
        </h3>

  
        <div className="flex flex-wrap justify-center gap-4">
          {pages.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`
                px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300
                ${item.active 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100' 
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
















    </div>
  </div>

</section>
<FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>

  </>  
  )
}
