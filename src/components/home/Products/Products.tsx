import { getProducts } from '@/services/products.service'
import { ProductResponse } from '@/types/response.types';

import ProductCard from '@/components/home/Products/ProductCard/ProductCard';
import SectionTittle from '@/components/Shared/SectionTittle/SectionTittle';



interface ProductsProps{
   isproductPage?: boolean;
  subcategoryId?: string;
  categoryId?: string;
}
export default  async function Products({isproductPage=false,subcategoryId, categoryId}:ProductsProps) {
const Products: ProductResponse = await getProducts({ subcategoryId, categoryId });

  return (
  <>

<section className='py-5'>
  <div className="container mx-auto px-4"> 
{   isproductPage?(""):(<SectionTittle subtitle='Featured' type='Products' />) 
}    <div className='py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
      {Products.data.map((prod) => (
        <ProductCard key={prod.id} prod={prod} />
      ))}
    </div>
  </div>
</section>
  </>
  )
}