import { Category } from "@/interfaces/category.interface";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getCategories } from "@/services/categories.service";

export const metadata = {
  title: "Categories | FreshCart",
  description: "Browse our wide range of product categories",
};

export default async function CategoriesPage() {
  const categoriesData = await getCategories();
  const categories: Category[] = categoriesData?.data ?? [];

  return (
    <>
      <div className="bg-green-500 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">All Categories</h1>
          <p className="text-green-100 text-lg">
            Browse our wide range of product categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Icon
              icon="mdi:folder-open-outline"
              className="text-gray-300 mb-4"
              style={{ fontSize: 80 }}
            />
            <p className="text-gray-500 text-lg">No categories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category._id}`}>
      <div className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-gray-800 text-base mb-1 group-hover:text-green-600 transition-colors duration-200">
            {category.name}
          </h2>
          <span className="text-sm text-green-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View Subcategories
            <Icon icon="mdi:arrow-right" className="text-sm" />
          </span>
        </div>
      </div>
    </Link>
  );
}