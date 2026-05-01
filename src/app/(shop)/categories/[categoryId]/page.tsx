
import { Category } from "@/interfaces/category.interface";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { getCategories, getSubcategoriesByCategory, Subcategory } from "@/services/categories.service";

interface CategoryDetailPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({ params }: CategoryDetailPageProps) {
  const { categoryId } = await params;
  const categoriesData = await getCategories();
  const category = categoriesData?.data?.find((c: Category) => c._id === categoryId);

  return {
    title: category ? `${category.name} Subcategories | FreshCart` : "Category | FreshCart",
    description: category ? `Browse subcategories in ${category.name}` : "",
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { categoryId } = await params;

  const categoriesData = await getCategories();
  const category: Category | undefined = categoriesData?.data?.find(
    (c: Category) => c._id === categoryId
  );

  if (!category) {
    notFound();
  }

  const subcategoriesData = await getSubcategoriesByCategory(categoryId);
  const subcategories: Subcategory[] = subcategoriesData?.data ?? [];
  const totalCount = subcategoriesData?.results ?? 0;

  return (
    <>
      <div className="bg-green-500 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors duration-200"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back to Categories
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Icon icon="mdi:folder-open" className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              <p className="text-green-100 mt-1">Browse products in {category.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/categories"
            className="text-sm text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="text-base" />
            Back to Categories
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-8">
          {totalCount} Subcategories in {category.name}
        </h2>

        {subcategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Icon
              icon="mdi:folder-open-outline"
              className="text-gray-300 mb-4"
              style={{ fontSize: 80 }}
            />
            <p className="text-gray-500 text-lg">No subcategories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {subcategories.map((subcategory) => (
              <SubcategoryCard key={subcategory._id} subcategory={subcategory} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function SubcategoryCard({ subcategory }: { subcategory: Subcategory }) {
  return (
    <Link href={`/products?subcategory=${subcategory._id}`}>
      <div className="group flex flex-col gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
          <Icon
            icon="mdi:folder"
            className="text-green-600 text-2xl"
          />
        </div>

        <p className="font-medium text-gray-700 text-sm group-hover:text-green-700 transition-colors duration-200">
          {subcategory.name}
        </p>
      </div>
    </Link>
  );
}