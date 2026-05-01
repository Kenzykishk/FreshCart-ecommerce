import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import StarRating from '@/components/Shared/StarRating/StarRating';

interface ProductCardProps {
  prod: any;
}

export default function ProductCard({ prod }: ProductCardProps) {
  if (!prod) return null;
  return (
    <div className='bg-white border border-gray-200 rounded-lg relative hover:shadow-xl hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300'>
      {prod.priceAfterDiscount && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded ml-1 my-1">
          -{Math.round(((prod.price - prod.priceAfterDiscount) / prod.price) * 100)}%
        </span>
      )}
      <Image src={prod.imageCover} width={180} height={200} alt={prod.brand.name} className='bg-green-500 mx-auto' />
      <div className='flex flex-col gap-1 absolute top-0 right-0 p-3'>
        <Button className='bg-white mb-1 group w-8 h-8 rounded-full shadow-sm'>
          <Icon icon="boxicons:heart" className='text-gray-600 py-0.5 px-0.5 size-5 group-hover:text-red-500' />
        </Button>
        <Button className='bg-white mb-1 group w-8 h-8 rounded-full shadow-sm'>
          <Icon icon="fa7-solid:arrows-rotate" className='text-gray-600 py-0.5 px-0.5 size-5 group-hover:text-green-600' />
        </Button>
        <Button className='bg-white mb-1 w-8 h-8 rounded-full shadow-sm group'>
          <Icon icon="ph:eye-bold" className='text-gray-600 py-0.5 px-0.5 size-5 group-hover:text-green-600' />
        </Button>
      </div>
      <div className='p-4'>
        <p className='text-xs text-gray-500 mb-1'>{prod.category.name}</p>
        <Link href={`/products/${prod._id ?? prod.id}`} className='font-medium mb-1'>{prod.title}</Link>
        <StarRating rating={prod.ratingsAverage} count={prod.ratingsQuantity} />
        <div className='flex justify-between my-2'>
          <div>
            <span className={prod.priceAfterDiscount ? "text-xl font-bold text-green-600" : "text-xl font-bold text-gray-700"}>
              {prod.priceAfterDiscount ? prod.priceAfterDiscount : prod.price} EGP
            </span>
            {prod?.priceAfterDiscount && (
              <span className='text-md text-gray-500 line-through ml-4 mt-2'>{prod.price}EGP</span>
            )}
          </div>
          <Button className='bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition hover:bg-green-700'>
            <Icon icon="ic:round-plus" className="size-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}