import Products from "@/components/home/Products/Products"
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData"
import PageHeader from "@/components/Shared/PageHeader/PageHeader"
import { footerFeaturesData } from "@/constants/features"
import { Category } from "@/interfaces/category.interface"
import { getCategories } from "@/services/categories.service"



interface ProductPageProps {
  searchParams: Promise<{
    subcategory?: string;
    category?: string;
  }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { subcategory, category } = await searchParams;

  let pageTitle = "All Products";
  let pageSubtitle = "Explore our complete product collection";
  let pageIcon = "mdi:package-variant";
  if (category) {
    const categoriesData = await getCategories();
    const found: Category | undefined = categoriesData?.data?.find(
      (c: Category) => c._id === category
    );
    if (found) {
      pageTitle = found.name;
      pageSubtitle = `Browse products in ${found.name}`;
      pageIcon = "mdi:tag";
    }
  }
  const allProductsConfig = {
    title: pageTitle,
    subtitle: pageSubtitle,
    icon: pageIcon,
    bgColor: "bg-gradient-to-r from-green-600 to-green-400",
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: pageTitle },
    ]
  };


  return (
    <>
      <PageHeader config={allProductsConfig} />
      <section className="my-8">
        <div className="container">
          <Products 
            isproductPage={true}
            subcategoryId={subcategory}
            categoryId={category}
          />
        </div>
      </section>
      <FeaturesData featuresData={footerFeaturesData} isFooter={true} />
    </>
  )
}