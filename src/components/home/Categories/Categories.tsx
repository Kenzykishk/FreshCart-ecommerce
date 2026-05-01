import SectionTittle from '@/components/Shared/SectionTittle/SectionTittle'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { getCategories } from '@/services/categories.service';
import { CategoryResponse } from '@/types/response.types';
import Image from 'next/image';

export default async function Categories() {

const Categories:CategoryResponse  =await getCategories()
  return (
    <section className='py-6  px-18'>
<div className="container">
  <div className='flex justify-between items-center '>
    <SectionTittle subtitle="Shop By " type="Categoriers"></SectionTittle>
<div className='group'>
  <Link href={"/Categories"} className='flex justify-center group-hover:text-emerald-700 transition-colors items-center  font-medium text-green-600'> View all Categories
  <Icon icon="formkit:arrowright" className='text-green-600 ms-2 transition-colors group-hover:text-emerald-700' ></Icon>
  </Link >
</div>
  </div>


<div className='grid mt-8 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
  
{
Categories.data.map((cat) => (
  <Link key={cat._id} href={`/categories/${cat._id}`}>
    <div className="bg-primary-100 shadow-sm hover:shadow-md transition-all bg-white p-4 rounded-lg flex flex-col items-center">
      <Image 
        src={cat.image} 
        alt={cat.name} 
        width={80} 
        height={80} 
        className="rounded-full object-cover aspect-square"
      />
      <h3 className="mt-3 text-sm font-medium">{cat.name}</h3>
    </div>
  </Link>
))}



</div>

</div>
    </section>
  )
}
