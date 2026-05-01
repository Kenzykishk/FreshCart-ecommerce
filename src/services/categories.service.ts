
export async function getCategories() {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}



export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubcategoryResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Subcategory[];
}

export async function getSubcategories(): Promise<SubcategoryResponse | null> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories"
    );
    if (!response.ok) {
      throw new Error(response.statusText + " error occurred while getting subcategories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<SubcategoryResponse | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
    if (!response.ok) {
      throw new Error(response.statusText + " error occurred while getting subcategories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSubcategory(
  subcategoryId: string
): Promise<{ data: Subcategory } | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryId}`
    );
    if (!response.ok) {
      throw new Error(response.statusText + " error occurred while getting subcategory");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductsBySubcategory(subcategoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products by subcategory");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}