import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData"
import PageHeader from "@/components/Shared/PageHeader/PageHeader"
import { footerFeaturesData } from "@/constants/features"
import { Brand } from "@/interfaces/product.interface";
import { getBrands } from "@/services/bands.services";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from 'next/link'


const BrandConfig = {
  title: "Top Brands",
  subtitle: "Shop from your favorite brands",
  icon: "mdi:tags",
bgColor: "bg-gradient-to-r from-purple-600 to-purple-400",
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Brands' },
  ]
}
export default  async function BrandPage() {
  const brandsData = await getBrands();
  const brands: Brand[] = brandsData?.data || [];
  return (
    <>
<PageHeader config={BrandConfig}></PageHeader>
    
<section className="py-16 bg-gray-50/30">
        <div className="container mx-auto px-4">
        
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <Link 
                href={`/brands/${brand._id}`} 
                key={brand._id}
                className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col items-center justify-center gap-4"
              >
                <div className="relative w-full aspect-video grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                   <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {brand.name}
                  </h3>
                  <span className="text-sm text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    View Products <Icon icon="mdi-light:arrow-right" className="size-4" style={{ stroke: 'currentColor', strokeWidth: '1.5' }}></Icon>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

        <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    
    </>
  )
}
