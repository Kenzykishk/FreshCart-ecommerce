export async function getProducts(params?: { 
  subcategoryId?: string; 
  categoryId?: string; 
}) {
  try {
    const url = new URL("https://ecommerce.routemisr.com/api/v1/products");
    if (params?.subcategoryId) url.searchParams.set("subcategory", params.subcategoryId);
if (params?.categoryId) url.searchParams.set("category", params.categoryId);

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) throw new Error("error getting products");
    return await response.json();
  } catch (error) {
    return error;
  }
}

 export async function getSingleProduct(id:String) {
  
  try {

    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    if(!response.ok){
      throw new Error(response.statusText+"error occured while getting products")
    }
    const data=await response.json();
    console.log("Singleproduct:", data)
    return data;

    
  } catch (error) {
    return error
  }
}


export async function getRelatedProducts(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=9`
    )
    if (!response.ok) 
      {
        throw new Error(response.statusText)
      }

    const data = await response.json();
    return data;
  } catch (error) {
    return error
  }
}


export async function getAllProducts(filters?: {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}) {
  const firstUrl = new URL("https://ecommerce.routemisr.com/api/v1/products");
  firstUrl.searchParams.set("limit", "50");
  firstUrl.searchParams.set("page", "1");

  if (filters?.category) firstUrl.searchParams.set("category", filters.category);
  if (filters?.brand) firstUrl.searchParams.set("brand", filters.brand);
  if (filters?.minPrice) firstUrl.searchParams.set("price[gte]", filters.minPrice);
  if (filters?.maxPrice) firstUrl.searchParams.set("price[lte]", filters.maxPrice);
  if (filters?.sort) firstUrl.searchParams.set("sort", filters.sort);

  const firstRes = await fetch(firstUrl.toString()).then(r => r.json());
  const totalPages = firstRes?.metadata?.numberOfPages || 1;
  let products = firstRes?.data || [];

  if (totalPages > 1) {
    const restRequests = [];
    for (let page = 2; page <= totalPages; page++) {
      const pageUrl = new URL(firstUrl.toString());
      pageUrl.searchParams.set("page", String(page));
      restRequests.push(fetch(pageUrl.toString()).then(r => r.json()));
    }
    const restResults = await Promise.all(restRequests);
    restResults.forEach(res => {
      products = [...products, ...(res?.data || [])];
    });
  }

  return products;
}