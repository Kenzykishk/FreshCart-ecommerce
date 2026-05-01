import ProductCard from '@/components/home/Products/ProductCard/ProductCard';
import PageHeader from '@/components/Shared/PageHeader/PageHeader';
import { Brand, Product } from '@/interfaces/product.interface';
import { getProductsByBrand, getSpecificBrand } from '@/services/bands.services';
interface BrandsDetailsPageprops{
  params:Promise<{brandsId:string}>
}

export default  async function SpecificBrandpage({params}:BrandsDetailsPageprops) {

  const {brandsId}=await params;
const brandResponse = await getSpecificBrand(brandsId);
  
  if (!brandResponse?.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Brand not found.</p>
      </div>
    );
  }

  const brand: Brand = brandResponse.data;
  const productsResponse = await getProductsByBrand(brandsId);
  const products: Product[] = productsResponse?.data || [];

  const BrandConfig = {
    title: brand.name,
    subtitle: `Shop ${brand.name} products`,
    bgColor:  "bg-gradient-to-r from-green-600 to-green-400", 
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Brands', href: '/brands' },
      { label: brand.name }
    ]
  };

  return (
<>

<>
      <PageHeader config={BrandConfig} />
      
      <section className="py-12">
        <div className="container">
          <p className="text-gray-500 mb-6 font-medium">Showing {products.length} products</p>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard  prod={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No products found for this brand yet.</p>
            </div>
          )}
        </div>
      </section>
    </>

</>  )
}
