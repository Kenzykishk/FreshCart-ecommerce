export async function getBrands() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
    if (!response.ok) {
      throw new Error("Error occurred while getting brands");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return null;
  }
}





export async function getSpecificBrand(id: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    if (!response.ok) {
      return null  
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null  
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}