"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getCategories } from "@/services/categories.service";
import { getBrands } from "@/services/bands.services";
import ProductCard from "@/components/home/Products/ProductCard/ProductCard";
import { getAllProducts } from "@/services/products.service";

interface Product {
  _id: string;
  title: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  category: { _id: string; name: string };
  brand?: { _id: string; name: string };
}

interface Category { _id: string; name: string; }
interface Brand { _id: string; name: string; }

const SORT_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Rating: High to Low", value: "-ratingsAverage" },
  { label: "Name: A to Z", value: "title" },
  { label: "Name: Z to A", value: "-title" },
];

const PRICE_PRESETS = [
  { label: "Under 500", max: 500 },
  { label: "Under 1K", max: 1000 },
  { label: "Under 5K", max: 5000 },
  { label: "Under 10K", max: 10000 },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);

  // ✅ hasActiveFilters متاحة في كل الـ component
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    !!minPrice ||
    !!maxPrice;

  useEffect(() => {
    async function fetchMeta() {
      const [categoriesRes, brandsRes] = await Promise.all([
        getCategories(),
        getBrands(),
      ]);
      setCategories(categoriesRes?.data || []);
      setBrands(brandsRes?.data || []);
    }
    fetchMeta();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const products = await getAllProducts({
        category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
        brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sort: sort || undefined,
      });

      let filtered = products;

      if (selectedCategories.length > 1) {
        filtered = filtered.filter((p: any) =>
          selectedCategories.includes(p.category?._id)
        );
      }

      if (selectedBrands.length > 1) {
        filtered = filtered.filter((p: any) =>
          selectedBrands.includes(p.brand?._id || "")
        );
      }

      // ✅ طبّق الـ query بس لو مفيش فلاتر مختارة
      if (query && !hasActiveFilters) {
        const q = query.toLowerCase();
        filtered = filtered.filter((p: any) =>
          p.title.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q)
        );
      }

      setDisplayedProducts(filtered);
      setLoading(false);
    }
    fetchProducts();
  }, [query, selectedCategories, selectedBrands, minPrice, maxPrice, sort]);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleBrand(id: string) {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }

  function clearAll() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  }

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Relevance";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <Icon icon="mdi:chevron-right" />
          <span className="text-gray-800 font-medium">Search Results</span>
        </div>

        <div className="flex items-center border border-gray-200 bg-white rounded-xl px-4 py-3 gap-3 mb-6 shadow-sm max-w-2xl">
          <Icon icon="mdi:magnify" className="text-gray-400 text-xl" />
          <input
            type="text"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = (e.target as HTMLInputElement).value.trim();
                router.push(val ? `/search?q=${encodeURIComponent(val)}` : "/search");
              }
            }}
            placeholder="Search for products..."
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
        </div>

        <div className="flex gap-6">

          <aside className="hidden lg:block w-64 shrink-0">

            <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => toggleCategory(cat._id)}
                      className="accent-green-600 w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-green-600 transition">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Price Range</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min (EGP)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max (EGP)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRICE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => { setMinPrice(""); setMaxPrice(String(preset.max)); }}
                    className={`text-xs border rounded-lg px-2 py-1.5 transition
                      ${maxPrice === String(preset.max) && minPrice === ""
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600"
                      }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Brands</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label key={brand._id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => toggleBrand(brand._id)}
                      className="accent-green-600 w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-green-600 transition">
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {(selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice || maxPrice) && (
              <button
                onClick={clearAll}
                className="mt-4 w-full text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          <div className="flex-1">

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg border transition ${viewMode === "grid" ? "bg-green-600 border-green-600 text-white" : "border-gray-200 text-gray-500 hover:border-green-400"}`}
                >
                  <Icon icon="mdi:view-grid" className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg border transition ${viewMode === "list" ? "bg-green-600 border-green-600 text-white" : "border-gray-200 text-gray-500 hover:border-green-400"}`}
                >
                  <Icon icon="mdi:view-list" className="text-lg" />
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 bg-white hover:border-green-400 transition"
                >
                  Sort by: <span className="font-medium">{currentSortLabel}</span>
                  <Icon icon="mdi:chevron-down" className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-48 py-1">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition
                          ${sort === opt.value
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

        
            {/* ✅ التعديل هنا: مش بيعرض "for dell" لو في فلاتر مختارة */}
            <p className="text-sm text-gray-500 mb-4">
              {loading ? "Loading..." : `${displayedProducts.length} products found`}
              {!loading && query && !hasActiveFilters && (
                <> for <span className="font-semibold text-gray-800">"{query}"</span></>
              )}
            </p>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Icon icon="mdi:magnify-close" className="text-6xl mb-4" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try different keywords or filters</p>
                <button onClick={clearAll} className="mt-4 text-green-600 text-sm hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "flex flex-col gap-4"
              }>
                {displayedProducts.map((product) => (
                  <ProductCard key={product._id} prod={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Icon icon="mdi:loading" className="animate-spin text-4xl text-green-600" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}