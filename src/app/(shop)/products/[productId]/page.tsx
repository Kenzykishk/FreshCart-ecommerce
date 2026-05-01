import { getRelatedProducts, getSingleProduct } from '@/services/products.service';
import { SingleProduct } from '@/types/response.types';
import ProductsSlider from '@/components/products/ProductSlider/ProductSlider';
import FeaturesData from '@/components/Shared/FeaturesData/FeaturesData';
import { footerFeaturesData, productFeaturesData } from '@/constants/features';
import Link from 'next/link'
import StarRating from '@/components/Shared/StarRating/StarRating';
import ProductActions from '@/components/home/Products/ProductAction/ProductActions';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import SectionTittle from '@/components/Shared/SectionTittle/SectionTittle';
import WishlistButton from '@/components/wishlist/WishlistButton/WishlistButton';
import ProductTap from '@/components/products/ProductTap/ProductTap';
import RelatedProducts from '@/components/products/RelatedProducts/RelatedProducts';
import AddToCartButton from '@/components/products/AddToCartButton/AddToCartButton';

interface productDetailsPageprops {
  params: Promise<{ productId: string }>
}

export default async function productDetailsPage({ params }: productDetailsPageprops) {
  const { productId } = await params;
  const product: SingleProduct = await getSingleProduct(productId);
  const productitem = product.data;

 const relatedData = await getRelatedProducts(productitem.category._id);
  const relatedProducts = relatedData.data

  return (
    <> 
      <section className='py-12'>
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8   ">
            
            <div className='md:col-span-1 '>
              <ProductsSlider images={productitem.images} />
            </div>


            <div className='md:col-span-2 shadow-lg bg-white rounded-lg p-6'>
            <div className='flex flex-col'>
<div>
  <Link className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition" href="/categories/6439d58a0049ad0b52b9003f">{productitem.category.name}</Link>
  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">{productitem.brand.name}</span>
</div>

<h1 className="text-2xl lg:text-3xl font-bold mt-4  text-gray-900 mb-3">{productitem.title}</h1>
  <StarRating rating={productitem.ratingsAverage} count={productitem.ratingsQuantity}   ></StarRating>

  <div className='flex items-center my-3 '>
    <span className={productitem.priceAfterDiscount?"text-3xl font-bold text-gray-900":"text-xl font-bold text-gray-700"}>
      {productitem.priceAfterDiscount ? productitem.priceAfterDiscount : productitem.price} EGP</span>

    {
        productitem?.priceAfterDiscount&&
        <span className='text-md text-gray-500 line-through mx-2  '>{productitem.price}EGP</span>

        
    } 
  {productitem.priceAfterDiscount && (
    <span className=" bg-red-600 text-white text-md px-3 py-1 rounded-full ml-1 ">
      save {Math.round(((productitem.price - productitem.priceAfterDiscount) / productitem.price) * 100)}%
    </span>
  )}
</div>

<div className='w-fit mb-6'>
  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
  <span className="w-2 h-2 rounded-full bg-green-500 "></span>In Stock</span>
</div>
<div className="border-t border-gray-100 pt-5 mb-6">
  <p className="text-gray-600 leading-relaxed">{productitem.description}</p>
  </div>




<ProductActions quantity={productitem.quantity} 
price={productitem.priceAfterDiscount ? productitem.priceAfterDiscount : productitem.price}></ProductActions>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        
    <AddToCartButton productId={productitem._id} />

        <Button 
          className="flex items-center justify-center gap-2 bg-gray-900 text-white h-12 rounded-xl font-bold hover:bg-black transition w-full"
        >
          <Icon icon="mingcute:lightning-fill" width="22" height="22" />
          Buy Now
        </Button>


      </div>
      <div className="flex items-center gap-2 w-full mt-4">
<WishlistButton productId={productitem._id} ></WishlistButton>

  <Button 
    variant="outline" 
    size="icon" 
    className="h-11 w-11 rounded-xl border-gray-200 text-gray-600 hover:bg-transparent hover:text-green-500 hover:border-green-500"
  >
    <Icon icon="ph:share-network" width="20" height="20" />
  </Button>
</div>

<div className="mt-8 border-t border-gray-100 pt-6">
<FeaturesData featuresData={productFeaturesData}   isProduct={true}  />
</div>

            </div>
            </div>

          </div>
          <ProductTap product={productitem}></ProductTap>


<div className='mt-18 relative'>  
  <div className='flex justify-between items-center'>
    <SectionTittle subtitle="You May Also " type="like" />
    
    <div className='flex gap-2'> 
      <button className="bg-gray-100 shadow-md rounded-full w-12 h-12 flex items-center justify-center group hover:bg-green-50 transition related-prev">
        <Icon icon="mdi:chevron-left" className="size-7 text-gray-600 group-hover:text-green-400"  />
      </button>
      <button className=" group bg-gray-100 shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-50 transition related-next">
        <Icon icon="mdi:chevron-right" className="size-7 text-gray-600 group-hover:text-green-400" />
      </button>
    </div>
  </div>

  <RelatedProducts products={relatedProducts} currentProductId={productitem._id} />
</div>

        </div>
        
      </section>



  <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    </>
  )
}